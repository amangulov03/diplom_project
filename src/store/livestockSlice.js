import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронные действия для получения данных
export const fetchLivestock = createAsyncThunk(
  'livestock/fetchLivestock',
  async (dataType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Пожалуйста, войдите в систему');
      }

      let apiEndpoint = '';
      switch (dataType) {
        case 'breedingStock':
          apiEndpoint = 'http://localhost:8000/api/get-breeding-stock';
          break;
        case 'bullsOwn':
          apiEndpoint = 'http://localhost:8000/api/get-bulls-own';
          break;
        case 'bullsForeing':
          apiEndpoint = 'http://localhost:8000/api/get-bulls-foreing';
          break;
        default:
          apiEndpoint = 'http://localhost:8000/api/get-breeding-stock';
      }

      const response = await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const normalizedData = response.data.map((item) => ({
        ...item,
        индивидуальныйНомер: item.индивидуальныйНомер?.toString() || '',
        инвентарныйНомер: item.инвентарныйНомер?.toString() || '',
        кличка: item.кличка?.toString() || '',
      }));

      return normalizedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Асинхронные действия для сохранения данных
export const saveLivestock = createAsyncThunk(
  'livestock/saveLivestock',
  async ({ formData, dataType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Пожалуйста, войдите в систему');
      }

      const individualNumber = formData.индивидуальныйНомер?.toString();
      if (!individualNumber || individualNumber.trim() === '') {
        throw new Error('Поле "индивидуальныйНомер" обязательно для заполнения!');
      }

      let apiEndpoint = '';
      switch (dataType) {
        case 'breedingStock':
          apiEndpoint = 'http://localhost:8000/api/save-breeding-stock';
          break;
        case 'bullsOwn':
          apiEndpoint = 'http://localhost:8000/api/save-bulls-own';
          break;
        case 'bullsForeing':
          apiEndpoint = 'http://localhost:8000/api/save-bulls-foreing';
          break;
        default:
          apiEndpoint = 'http://localhost:8000/api/save-breeding-stock';
      }

      const response = await axios.post(apiEndpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Асинхронные действия для обновления данных
export const updateLivestock = createAsyncThunk(
  'livestock/updateLivestock',
  async ({ formData, dataType }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Пожалуйста, войдите в систему');
      }

      const individualNumber = formData.индивидуальныйНомер?.toString();
      if (!individualNumber || individualNumber.trim() === '') {
        throw new Error('Поле "индивидуальныйНомер" обязательно для заполнения!');
      }

      let apiEndpoint = '';
      switch (dataType) {
        case 'breedingStock':
          apiEndpoint = 'http://localhost:8000/api/update-breeding-stock';
          break;
        case 'bullsOwn':
          apiEndpoint = 'http://localhost:8000/api/update-bulls-own';
          break;
        case 'bullsForeing':
          apiEndpoint = 'http://localhost:8000/api/update-bulls-foreing';
          break;
        default:
          apiEndpoint = 'http://localhost:8000/api/update-breeding-stock';
      }

      const response = await axios.put(apiEndpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const livestockSlice = createSlice({
  name: 'livestock',
  initialState: {
    livestockData: [],
    isSearch: false,
    searchValue: '',
    isEditing: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleSearch: (state) => {
      state.isSearch = !state.isSearch;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearSearch: (state) => {
      state.searchValue = '';
      state.isEditing = false;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLivestock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLivestock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.livestockData = action.payload;
      })
      .addCase(fetchLivestock.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(saveLivestock.fulfilled, (state, action) => {
        state.livestockData.push(action.meta.arg.formData);
      })
      .addCase(updateLivestock.fulfilled, (state, action) => {
        const updatedData = action.meta.arg.formData;
        state.livestockData = state.livestockData.map((item) =>
          item.индивидуальныйНомер === updatedData.индивидуальныйНомер
            ? updatedData
            : item
        );
        state.searchValue = '';
        state.isEditing = false;
      });
  },
});

export const { toggleSearch, setSearchValue, clearSearch, setEditing } =
  livestockSlice.actions;
export default livestockSlice.reducer;
