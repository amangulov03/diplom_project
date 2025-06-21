import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { MdOutlineDriveFileRenameOutline, MdAddToPhotos } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import {
  toggleSearch,
  setSearchValue,
  clearSearch,
  setEditing,
  fetchLivestock,
  saveLivestock,
  updateLivestock,
} from '../store/livestockSlice';

function RightMenu({ formData, onSearchResult, onResetForm, dataType = 'breedingStock' }) {
  const dispatch = useDispatch();
  const { livestockData, isSearch, searchValue, isEditing, } =
    useSelector((state) => state.livestock);

  const SearchRef = useRef(null);
  const hiddenSearchRef = useRef(null);
  const preventCloseRef = useRef(false);

  useEffect(() => {
    dispatch(fetchLivestock(dataType));
  }, [dispatch, dataType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearch &&
        !preventCloseRef.current &&
        SearchRef.current &&
        hiddenSearchRef.current &&
        !SearchRef.current.contains(event.target) &&
        !hiddenSearchRef.current.contains(event.target)
      ) {
        dispatch(toggleSearch());
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSearch, dispatch]);

  const updateSearchValue = useMemo(
    () =>
      debounce((query) => {
        if (!query) {
          return;
        }

        const result = livestockData.find(
          (item) =>
            (item.индивидуальныйНомер &&
              item.индивидуальныйНомер.toString().includes(query)) ||
            (item.кличка && item.кличка.toString().includes(query))
        );
        if (onSearchResult) onSearchResult(result || null);
        dispatch(setEditing(!!result));
      }, 500),
    [livestockData, onSearchResult, dispatch]
  );

  const onChangeInput = (event) => {
    const inputValue = event.target.value;
    dispatch(setSearchValue(inputValue));
    updateSearchValue(inputValue);

    if (inputValue.trim() === '') {
      if (onSearchResult) onSearchResult(null);
      dispatch(setEditing(false));
    }
  };

  const onClickClear = () => {
    preventCloseRef.current = true;
    dispatch(clearSearch());
    if (onSearchResult) onSearchResult(null);

    setTimeout(() => {
      preventCloseRef.current = false;
    }, 300);
  };

  const handleSave = async () => {
    const individualNumber = formData.индивидуальныйНомер?.toString();
    if (!individualNumber || individualNumber.trim() === '') {
      alert('Поле "индивидуальныйНомер" обязательно для заполнения!');
      return;
    }

    if (
      livestockData.some(
        (item) => item.индивидуальныйНомер === individualNumber
      )
    ) {
      alert(
        'Запись с таким индивидуальным номером уже существует!'
      );
      return;
    }

    let fieldsToCheck;
    if (dataType === 'bullsForeing') {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        кодСемени: formData.кодСемени,
        оригинальнаяКличка: formData.оригинальнаяКличка,
        карточнаяКличка: formData.карточнаяКличка,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        компания_поставщикСемени: formData.компания_поставщикСемени,
        порода: formData.порода,
        линия: formData.линия,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        генеалогия: formData.генеалогия,
        фото: formData.фото,
      };
    } else if (dataType === 'bullsOwn') {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        местоРождения: formData.местоРождения,
        порода: formData.порода,
        линия: formData.линия,
        породность: formData.породность,
        семейство: formData.семейство,
        комуПринадлежит: formData.комуПринадлежит,
        мастьИПриметы: formData.мастьИПриметы,
        группаКрови: formData.группаКрови,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        фото: formData.фото,
        генеалогия: formData.генеалогия,
        живаяМассаПриРождении: formData.живаяМассаПриРождении,
        живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
        живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
        живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
        живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
        перемещениеОткуда: formData.перемещениеОткуда,
        перемещениеКуда: formData.перемещениеКуда,
        перемещениеДата: formData.перемещениеДата,
        перемещениеВозраст: formData.перемещениеВозраст,
        перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
        перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
        датаВыбытия: formData.датаВыбытия,
        причинаВыбытия: formData.причинаВыбытия,
      };
    } else {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        местоРождения: formData.местоРождения,
        порода: formData.порода,
        линия: formData.линия,
        породность: formData.породность,
        семейство: formData.семейство,
        комуПринадлежит: formData.комуПринадлежит,
        назначениеКоровы: formData.назначениеКоровы,
        мастьИПриметы: formData.мастьИПриметы,
        группаКрови: formData.группаКрови,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        фото: formData.фото,
        генеалогия: formData.генеалогия,
        живаяМассаПриРождении: formData.живаяМассаПриРождении,
        живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
        живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
        живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
        живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
        живаяМассаПриПервомОсоменении: formData.живаяМассаПриПервомОсоменении,
        возрастПервогоОсеменения: formData.возрастПервогоОсеменения,
        датаОсеменения: formData.датаОсеменения,
        номерОсеменения: formData.номерОсеменения,
        индивидуальныйНомерБыка: formData.индивидуальныйНомерБыка,
        кличкаБыка: formData.кличкаБыка,
        методСлучки: formData.методСлучки,
        датаИсследованияНаСтельность: formData.датаИсследованияНаСтельность,
        результатИсследованияНаСтельность: formData.результатИсследованияНаСтельность,
        датаОтела: formData.датаОтела,
        результатОтела: formData.результатОтела,
        легкостьОтела: formData.легкостьОтела,
        индивидуальныеНомераПриплода: formData.индивидуальныеНомераПриплода,
        датаЗапуска: formData.датаЗапуска,
        продолжительностьСервисПериода: formData.продолжительностьСервисПериода,
        продолжительностьСухостойногоПериода: formData.продолжительностьСухостойногоПериода,
        датаКонтрольногоДоения: formData.датаКонтрольногоДоения,
        удой: formData.удой,
        жир: formData.жир,
        белок: formData.белок,
        времяДоения: formData.времяДоения,
        скоростьМолокоотдачи: formData.скоростьМолокоотдачи,
        баллСкоростиМолокоотдачи: formData.баллСкоростиМолокоотдачи,
        удойЗаЛактацию: formData.удойЗаЛактацию,
        удойЗа305Дней: formData.удойЗа305Дней,
        жирЗаЛактацию: formData.жирЗаЛактацию,
        жирЗа305Дней: formData.жирЗа305Дней,
        белокЗаЛактацию: formData.белокЗаЛактацию,
        белокЗа305Дней: formData.белокЗа305Дней,
        датаПовторногоЗапуска: formData.датаПовторногоЗапуска,
        количествоДойныхДней: formData.количествоДойныхДней,
        перемещениеОткуда: formData.перемещениеОткуда,
        перемещениеКуда: formData.перемещениеКуда,
        перемещениеДата: formData.перемещениеДата,
        перемещениеВозраст: formData.перемещениеВозраст,
        перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
        перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
        датаВыбытия: formData.датаВыбытия,
        причинаВыбытия: formData.причинаВыбытия,
        линейнаяОценкаБ: formData.линейнаяОценкаБ,
        линейнаяОценкаА: formData.линейнаяОценкаА,
      };
    }

    const isAnyFieldFilled = Object.values(fieldsToCheck).some((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'object') return Object.keys(value).length > 0;
      return !!value;
    });

    if (!isAnyFieldFilled) {
      alert('Заполните хотя бы одно поле!');
      return;
    }

    const filteredFormData = Object.fromEntries(
      Object.entries(fieldsToCheck).filter(([key, value]) =>
        key === 'индивидуальныйНомер' ||
        (value &&
          (typeof value === 'string'
            ? value.trim() !== ''
            : typeof value === 'object'
            ? Object.keys(value).length > 0
            : !!value))
      )
    );

    const result = await dispatch(
      saveLivestock({ formData: filteredFormData, dataType })
    );

    if (saveLivestock.fulfilled.match(result)) {
      alert(result.payload.message);
      if (onResetForm) onResetForm();
    } else {
      alert(result.payload?.detail || 'Ошибка при сохранении данных');
    }
  };

  const handleUpdate = async () => {
    const individualNumber = formData.индивидуальныйНомер?.toString();
    if (!individualNumber || individualNumber.trim() === '') {
      alert('Поле "индивидуальныйНомер" обязательно для заполнения!');
      return;
    }

    const existingRecord = livestockData.find(
      (item) => item.индивидуальныйНомер === individualNumber
    );
    if (!existingRecord) {
      alert(
        'Запись не найдена! Пожалуйста, выберите существующую запись через поиск.'
      );
      return;
    }

    let fieldsToCheck;
    if (dataType === 'bullsForeing') {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        кодСемени: formData.кодСемени,
        оригинальнаяКличка: formData.оригинальнаяКличка,
        карточнаяКличка: formData.карточнаяКличка,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        компания_поставщикСемени: formData.компания_поставщикСемени,
        порода: formData.порода,
        линия: formData.линия,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        генеалогия: formData.генеалогия,
        фото: formData.фото,
      };
    } else if (dataType === 'bullsOwn') {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        местоРождения: formData.местоРождения,
        порода: formData.порода,
        линия: formData.линия,
        породность: formData.породность,
        семейство: formData.семейство,
        комуПринадлежит: formData.комуПринадлежит,
        мастьИПриметы: formData.мастьИПриметы,
        группаКрови: formData.группаКрови,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        фото: formData.фото,
        генеалогия: formData.генеалогия,
        живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
        живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
        живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
        живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
        перемещениеОткуда: formData.перемещениеОткуда,
        перемещениеКуда: formData.перемещениеКуда,
        перемещениеДата: formData.перемещениеДата,
        перемещениеВозраст: formData.перемещениеВозраст,
        перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
        перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
        датаВыбытия: formData.датаВыбытия,
        причинаВыбытия: formData.причинаВыбытия,
      };
    } else {
      fieldsToCheck = {
        индивидуальныйНомер: formData.индивидуальныйНомер,
        инвентарныйНомер: formData.инвентарныйНомер,
        идентификационныйНомер: formData.идентификационныйНомер,
        кличка: formData.кличка,
        датаРождения: formData.датаРождения,
        местоРождения: formData.местоРождения,
        порода: formData.порода,
        линия: formData.линия,
        породность: formData.породность,
        семейство: formData.семейство,
        комуПринадлежит: formData.комуПринадлежит,
        назначениеКоровы: formData.назначениеКоровы,
        мастьИПриметы: formData.мастьИПриметы,
        группаКрови: formData.группаКрови,
        баллОбщий: formData.баллОбщий,
        класс: formData.класс,
        кому_и_кудаПродано: formData.кому_и_кудаПродано,
        датаПродажи: formData.датаПродажи,
        фото: formData.фото,
        генеалогия: formData.генеалогия,
        живаяМасconstituentаПриРождении: formData.живаяМассаПриРождении,
        живаяМассаВ6Месяцев: formData.живаяМассаВ6Месяцев,
        живаяМассаВ10Месяцев: formData.живаяМассаВ10Месяцев,
        живаяМассаВ12Месяцев: formData.живаяМассаВ12Месяцев,
        живаяМассаВ18Месяцев: formData.живаяМассаВ18Месяцев,
        живаяМассаПриПервомОсоменении: formData.живаяМассаПриПервомОсоменении,
        возрастПервогоОсеменения: formData.возрастПервогоОсеменения,
        датаОсеменения: formData.датаОсеменения,
        номерОсеменения: formData.номерОсеменения,
        индивидуальныйНомерБыка: formData.индивидуальныйНомерБыка,
        кличкаБыка: formData.кличкаБыка,
        методСлучки: formData.методСлучки,
        датаИсследованияНаСтельность: formData.датаИсследованияНаСтельность,
        результатИсследованияНаСтельность: formData.результатИсследованияНаСтельность,
        датаОтела: formData.датаОтела,
        результатОтела: formData.результатОтела,
        легкостьОтела: formData.легкостьОтела,
        индивидуальныеНомераПриплода: formData.индивидуальныеНомераПриплода,
        датаЗапуска: formData.датаЗапуска,
        продолжительностьСервисПериода: formData.продолжительностьСервисПериода,
        продолжительностьСухостойногоПериода: formData.продолжительностьСухостойногоПериода,
        датаКонтрольногоДоения: formData.датаКонтрольногоДоения,
        удой: formData.удой,
        жир: formData.жир,
        белок: formData.белок,
        времяДоения: formData.времяДоения,
        скоростьМолокоотDAчи: formData.скоростьМолокоотдачи,
        баллСкоростиМолокоотдачи: formData.баллСкоростиМолокоотдачи,
        удойЗаЛактацию: formData.удойЗаЛактацию,
        удойЗа305Дней: formData.удойЗа305Дней,
        жирЗаЛактацию: formData.жирЗаЛактацию,
        жирЗа305Дней: formData.жирЗа305Дней,
        белокЗаЛактацию: formData.белокЗаЛактацию,
        белокЗа305Дней: formData.белокЗа305Дней,
        датаПовторногоЗапуска: formData.датаПовторногоЗапуска,
        количествоДойныхДней: formData.количествоДойныхДней,
        перемещениеОткуда: formData.перемещениеОткуда,
        перемещениеКуда: formData.перемещениеКуда,
        перемещениеДата: formData.перемещениеДата,
        перемещениеВозраст: formData.перемещениеВозраст,
        перемещениеЖиваяМасса: formData.перемещениеЖиваяМасса,
        перемещениеЦельПеремещения: formData.перемещениеЦельПеремещения,
        датаВыбытия: formData.датаВыбытия,
        причинаВыбытия: formData.причинаВыбытия,
        линейнаяОценкаБ: formData.линейнаяОценкаБ,
        линейнаяОценкаА: formData.линейнаяОценкаА,
      };
    }

    const isAnyFieldFilled = Object.values(fieldsToCheck).some((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'object') return Object.keys(value).length > 0;
      return !!value;
    });

    if (!isAnyFieldFilled) {
      alert('Заполните хотя бы одно поле!');
      return;
    }

    const updatedFields = Object.fromEntries(
      Object.entries(fieldsToCheck).filter(([key, value]) =>
        key === 'индивидуальныйНомер' ||
        (value &&
          (typeof value === 'string'
            ? value.trim() !== ''
            : typeof value === 'object'
            ? Object.keys(value).length > 0
            : !!value))
      )
    );

    const updatedFormData = { ...existingRecord, ...updatedFields };

    const result = await dispatch(
      updateLivestock({ formData: updatedFormData, dataType })
    );

    if (updateLivestock.fulfilled.match(result)) {
      alert(result.payload.message);
      if (onResetForm) onResetForm();
    } else {
      alert(result.payload?.detail || 'Ошибка при обновлении данных');
    }
  };

  return (
    <div className="right-block">
      <div className="icons">
        <div className="tooltip-container">
          <div
            className={`icon ${isSearch ? 'open' : ''}`}
            ref={SearchRef}
            onClick={() => dispatch(toggleSearch())}
          >
            <FaSearch />
          </div>
          <span className="tooltip-text">Поиск</span>
        </div>
        <div className={`search ${isSearch ? 'show' : ''}`} ref={hiddenSearchRef}>
          <svg
            className="search_aicon"
            height="512px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
          </svg>
          <input
            ref={hiddenSearchRef}
            value={searchValue}
            onChange={onChangeInput}
            className="root"
            placeholder="Поиск..."
          />
          {searchValue && (
            <svg
              onClick={onClickClear}
              className="clear_icon"
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
        <div className="tooltip-container" onClick={handleUpdate}>
          <div className="icon">
            <MdOutlineDriveFileRenameOutline />
          </div>
          <span className="tooltip-text">Сохранить</span>
        </div>
        <div
          className="tooltip-container"
          onClick={handleSave}
          style={{
            opacity: isEditing ? 0.5 : 1,
            pointerEvents: isEditing ? 'none' : 'auto',
          }}
        >
          <div className="icon">
            <MdAddToPhotos />
          </div>
          <span className="tooltip-text">
            {isEditing ? 'Нельзя добавить, используйте "Изменить"' : 'Добавить'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RightMenu;
