import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import robotoFont from "../assets/fonts/Roboto-Regular.ttf";
import robotoBoldFont from "../assets/fonts/Roboto-Bold.ttf";
import kyrgyzstanEmblem from "../img/Kyrgyzstan 1.png";

// Регистрация шрифтов
Font.register({
    family: "Roboto",
    fonts: [
        { src: robotoFont, fontWeight: 400 },
        { src: robotoBoldFont, fontWeight: 700 },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        padding: 20,
        backgroundColor: "#e6f0e6",
        position: "relative",
    },
    outerBorder: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        border: "2 solid #2e7d32",
        borderRadius: 5,
    },
    cornerDecoration: {
        position: "absolute",
        width: 30,
        height: 30,
        borderColor: "#2e7d32",
    },
    cornerTopLeft: {
        top: 10,
        left: 10,
        borderTop: "2 solid #2e7d32",
        borderLeft: "2 solid #2e7d32",
        borderRadius: 5,
    },
    cornerTopRight: {
        top: 10,
        right: 10,
        borderTop: "2 solid #2e7d32",
        borderRight: "2 solid #2e7d32",
        borderRadius: 5,
    },
    cornerBottomLeft: {
        bottom: 10,
        left: 10,
        borderBottom: "2 solid #2e7d32",
        borderLeft: "2 solid #2e7d32",
        borderRadius: 5,
    },
    cornerBottomRight: {
        bottom: 10,
        right: 10,
        borderBottom: "2 solid #2e7d32",
        borderRight: "2 solid #2e7d32",
        borderRadius: 5,
    },
    header: {
        textAlign: "center",
        marginBottom: 10,
    },
    formInfo: {
        fontSize: 8,
        color: "#2e7d32",
        textAlign: "right",
        marginBottom: 5,
    },
    logoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
    },
    logoSection: {
        flexDirection: "row",
        alignItems: "center",
        width: 200,
    },
    logoImage: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    logoText: {
        fontSize: 8,
        color: "#2e7d32",
        fontWeight: 700,
        textTransform: "uppercase",
        textAlign: "left",
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 700,
        color: "#2e7d32",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: "#2e7d32",
        textTransform: "uppercase",
    },
    serialNumbers: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    serialText: {
        fontSize: 10,
        color: "#2e7d32",
        fontWeight: 700,
    },
    content: {
        padding: 10,
        border: "1 solid #2e7d32",
        borderRadius: 5,
        backgroundColor: "#f5f5f5",
        marginBottom: 10,
    },
    imageAndGenealogyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    imageContainer: {
        width: "50%", // Уменьшаем ширину фото, чтобы уместить генеалогию
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 180, // Фото подстраивается под ширину контейнера
        height: 120,
        borderRadius: 15,
        border: "1 solid #2e7d32",
        backgroundColor: "#fff",
        objectFit: "cover",
    },
    origin: {
        width: "70%",
        height: 200, // Генеалогия занимает оставшееся пространство
    },
    genealogy: {
        padding: 5,
        border: "1 dashed #2e7d32",
        borderRadius: 5,
        backgroundColor: "#fff",
        height: "100%", // Растягиваем генеалогию по высоте фото
    },
    genealogyTitle: {
        fontSize: 10,
        fontWeight: 700,
        color: "#2e7d32",
        marginBottom: 5,
        textAlign: "center",
        textTransform: "uppercase",
    },
    table: {
        display: "flex",
        flexDirection: "column",
        border: "1 solid #2e7d32",
        borderRadius: 3,
    },
    tableRow: {
        flexDirection: "row",
        borderBottom: "1 solid #2e7d32",
    },
    tableHeader: {
        backgroundColor: "#e6f0e6",
        borderBottom: "1 solid #2e7d32",
    },
    tableCell: {
        padding: 3,
        fontSize: 9,
        color: "#333",
        textAlign: "center",
        borderRight: "1 solid #2e7d32",
    },
    tableCellLabel: {
        padding: 3,
        fontSize: 9,
        fontWeight: 700,
        color: "#2e7d32",
        textAlign: "center",
        borderRight: "1 solid #2e7d32",
        width: "30%", // Для колонки "Предок"
    },
    tableCellValue: {
        padding: 3,
        fontSize: 9,
        color: "#333",
        textAlign: "center",
        borderRight: "1 solid #2e7d32",
        width: "50%", // Для колонок "Индивидуальный номер", "Кличка", "Дата рождения"
    },
    noData: {
        fontSize: 9,
        color: "#999",
        textAlign: "center",
        padding: 5,
    },
    fieldContainer: {
        marginBottom: 5,
    },
    field: {
        fontSize: 9,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 3,
        borderBottom: "1 dashed #2e7d32",
    },
    label: {
        fontWeight: 700,
        color: "#2e7d32",
        width: "40%",
        textTransform: "uppercase",
    },
    value: {
        color: "#333",
        width: "60%",
        textAlign: "right",
        fontSize: 9,
    },
    signatureSection: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    signature: {
        fontSize: 8,
        color: "#2e7d32",
        width: "45%",
    },
    signatureLabel: {
        fontSize: 8,
        color: "#2e7d32",
        fontWeight: 700,
        marginBottom: 3,
    },
    sign: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 15
    },
    tx: {
        fontSize: 10,
        fontWeight: 600
    },
    signatureText: {
        fontSize: 8,
        color: "#2e7d32",
        marginRight: 10,
    },
    signatureLine: {
        borderTop: "1 solid #2e7d32",
        width: 100, // Fixed width for signature line
        marginTop: 5,
    },
    footer: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 8,
        color: "#2e7d32",
        paddingTop: 5,
    },
    footerText: {
        fontSize: 8,
        color: "#2e7d32",
        marginRight: 10,
    },
    line: {
        borderTop: "1 solid #2e7d32",
        width: "100%", // Fixed width for footer line
        marginTop: 4,
    },
});

const BreedingStockPDF = ({ item }) => {
    // Проверяем, есть ли данные в генеалогии
    const hasGenealogyData =
        item.генеалогия &&
        (item.генеалогия.отец?.индивидуальный_номер ||
            item.генеалогия.отец?.кличка ||
            item.генеалогия.отец?.дата_рождения ||
            item.генеалогия.мать?.индивидуальный_номер ||
            item.генеалогия.мать?.кличка ||
            item.генеалогия.мать?.удой ||
            item.генеалогия.мать?.дата_рождения ||
            item.генеалогия.отец_отца?.индивидуальный_номер ||
            item.генеалогия.отец_отца?.кличка ||
            item.генеалогия.отец_отца?.дата_рождения ||
            item.генеалогия.мать_отца?.индивидуальный_номер ||
            item.генеалогия.мать_отца?.кличка ||
            item.генеалогия.мать_отца?.удой ||
            item.генеалогия.мать_отца?.дата_рождения ||
            item.генеалогия.отец_матери?.индивидуальный_номер ||
            item.генеалогия.отец_матери?.кличка ||
            item.генеалогия.отец_матери?.дата_рождения ||
            item.генеалогия.мать_матери?.индивидуальный_номер ||
            item.генеалогия.мать_матери?.кличка ||
            item.генеалогия.мать_матери?.удой ||
            item.генеалогия.мать_матери?.дата_рождения);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.outerBorder} fixed />
                <View style={[styles.cornerDecoration, styles.cornerTopLeft]} fixed />
                <View style={[styles.cornerDecoration, styles.cornerTopRight]} fixed />
                <View style={[styles.cornerDecoration, styles.cornerBottomLeft]} fixed />
                <View style={[styles.cornerDecoration, styles.cornerBottomRight]} fixed />

                <View style={styles.header}>
                    <Text style={styles.formInfo}>
                        Постановление № 592 от 31.10.2022 г{"\n"}
                        Правительство Кыргызской Республики{"\n"}
                        Приказ № 397 от 31.10.2022 г
                    </Text>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoSection}>
                            <Image style={styles.logoImage} src={kyrgyzstanEmblem} />
                            <Text style={styles.logoText}>
                                МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.title}>ПЛЕМЕННОЕ СВИДЕТЕЛЬСТВО</Text>
                    <Text style={styles.subtitle}>
                        НА КРУПНЫЙ РОГАТЫЙ СКОТ МОЛОЧНОЙ ПРОДУКТИВНОСТИ
                    </Text>
                </View>

                <View style={styles.serialNumbers}>
                    <Text style={styles.serialText}>Серия ПС 00 (серия)</Text>
                    <Text style={styles.serialText}>
                        № {item.индивидуальныйНомер || "00000000"} (регистрационный номер)
                    </Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.imageAndGenealogyContainer}>
                        <View style={styles.imageContainer}>
                            {item.фото ? (
                                <Image style={styles.image} src={item.фото} />
                            ) : (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 8,
                                        color: "#999",
                                    }}
                                >
                                    Фото отсутствует
                                </Text>
                            )}
                        </View>
                        <View style={styles.origin}>
                            <Text style={styles.genealogyTitle}>Происхождение</Text>
                            <View style={styles.genealogy}>
                                {hasGenealogyData ? (
                                    <View style={styles.table}>
                                        {/* Заголовок таблицы */}
                                        <View
                                            style={[styles.tableRow, styles.tableHeader]}
                                        >
                                            <Text style={styles.tableCellLabel}>
                                                Предок
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                Инд. номер
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                Кличка
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                Удой
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                Дата рождения
                                            </Text>
                                        </View>
                                        {/* Отец */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Отец
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>—</Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец?.дата_рождения ||
                                                    "Не указано"}
                                            </Text>
                                        </View>
                                        {/* Отец отца */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Отец отца
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_отца
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_отца?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>—</Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_отца
                                                    ?.дата_рождения || "Не указано"}
                                            </Text>
                                        </View>
                                        {/* Мать отца */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Мать отца
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_отца
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_отца?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_отца?.удой ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_отца
                                                    ?.дата_рождения || "Не указано"}
                                            </Text>
                                        </View>
                                        {/* Мать */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Мать
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать?.удой ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать?.дата_рождения ||
                                                    "Не указано"}
                                            </Text>
                                        </View>
                                        {/* Отец матери */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Отец матери
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_матери
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_матери?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>—</Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.отец_матери
                                                    ?.дата_рождения || "Не указано"}
                                            </Text>
                                        </View>
                                        {/* Мать матери */}
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCellLabel}>
                                                Мать матери
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_матери
                                                    ?.индивидуальный_номер ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_матери?.кличка ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_матери?.удой ||
                                                    "Не указано"}
                                            </Text>
                                            <Text style={styles.tableCellValue}>
                                                {item.генеалогия?.мать_матери
                                                    ?.дата_рождения || "Не указано"}
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <Text style={styles.noData}>
                                        Данные о генеалогии отсутствуют
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Индивидуальный номер:</Text>
                            <Text style={styles.value}>
                                {item.индивидуальныйНомер || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Инвентарный номер:</Text>
                            <Text style={styles.value}>
                                {item.инвентарныйНомер || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Идентификационный номер:</Text>
                            <Text style={styles.value}>
                                {item.идентификационныйНомер || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Кличка:</Text>
                            <Text style={styles.value}>
                                {item.кличка || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Дата рождения:</Text>
                            <Text style={styles.value}>
                                {item.датаРождения || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Место рождения:</Text>
                            <Text style={styles.value}>
                                {item.местоРождения || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Порода:</Text>
                            <Text style={styles.value}>
                                {item.порода || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Линия:</Text>
                            <Text style={styles.value}>{item.линия || "Не указано"}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Породность:</Text>
                            <Text style={styles.value}>
                                {item.породность || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Семейство:</Text>
                            <Text style={styles.value}>
                                {item.семейство || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Владелец:</Text>
                            <Text style={styles.value}>
                                {item.комуПринадлежит || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Назначение:</Text>
                            <Text style={styles.value}>
                                {item.назначениеКоровы || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Масть и приметы:</Text>
                            <Text style={styles.value}>
                                {item.мастьИПриметы || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Балл общий:</Text>
                            <Text style={styles.value}>
                                {item.баллОбщий || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Класс:</Text>
                            <Text style={styles.value}>{item.класс || "Не указано"}</Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Кому и куда продано:</Text>
                            <Text style={styles.value}>
                                {item.кому_и_кудаПродано || "Не указано"}
                            </Text>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Дата продажи:</Text>
                            <Text style={styles.value}>
                                {item.датаПродажи || "Не указано"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.signatureSection}>
                    <View style={styles.signature}>
                        <Text style={styles.signatureLabel}>Руководитель</Text>
                        <View style={styles.sign}>
                            <Text style={styles.signatureText}>Родикон А.П.</Text>
                            <View style={styles.signatureLine} />
                        </View>
                        <Text style={styles.tx}>М. П.</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text style={styles.signatureLabel}>Зоотехник - селекционер</Text>
                        <View style={styles.sign}>
                            <Text style={styles.signatureText}>Болотова Г.А.</Text>
                            <View style={styles.signatureLine} />
                        </View>
                        <Text style={styles.tx}>М. П.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Сертификат № {item.индивидуальныйНомер || "Не указано"} • Выдано:
                        {"      "}
                    </Text>
                    <View style={styles.line} />
                </View>
            </Page>
        </Document>
    );
};

export default BreedingStockPDF;
