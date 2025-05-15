import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import robotoFont from "../assets/fonts/Roboto-Regular.ttf";
import robotoBoldFont from "../assets/fonts/Roboto-Bold.ttf";
import kyrgyzstanEmblem from "../img/Kyrgyzstan 1.png";
import knauLogo from "../img/knau.png";


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
        marginVertical: 10,
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
    imageContainer: {
        textAlign: "center",
        marginBottom: 10,
        display: "grid",
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 15,
        border: "1 solid #2e7d32",
        backgroundColor: "#fff",
        objectFit: "cover",
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
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    signature: {
        textAlign: "center",
        fontSize: 8,
        color: "#2e7d32",
        width: "45%",
    },
    signatureLine: {
        borderTop: "1 solid #2e7d32",
        width: 80,
        marginTop: 5,
        marginBottom: 3,
        marginLeft: "auto",
        marginRight: "auto",
    },
    signatureLabel: {
        fontSize: 8,
        color: "#2e7d32",
        fontWeight: 700,
        marginBottom: 3,
    },
    footer: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 8,
        color: "#2e7d32",
        borderTop: "1 solid #2e7d32",
        paddingTop: 5,
    },
});

const BullsForeingPDF = ({ item }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.outerBorder} fixed />
            <View style={[styles.cornerDecoration, styles.cornerTopLeft]} fixed />
            <View style={[styles.cornerDecoration, styles.cornerTopRight]} fixed />
            <View style={[styles.cornerDecoration, styles.cornerBottomLeft]} fixed />
            <View style={[styles.cornerDecoration, styles.cornerBottomRight]} fixed />

            <View style={styles.header}>
                <Text style={styles.formInfo}>
                    ФОРМА: Приложение №1{"\n"}
                    от 06.06.2016 №232
                </Text>
                <View style={styles.logoContainer}>
                    <View style={styles.logoSection}>
                        <Image style={styles.logoImage} src={kyrgyzstanEmblem} />
                        <Text style={styles.logoText}>
                            МИНИСТЕРСТВО СЕЛЬСКОГО ХОЗЯЙСТВА КЫРГЫЗСКОЙ РЕСПУБЛИКИ
                        </Text>
                    </View>
                    <View style={styles.logoSection}>
                        <Image style={styles.logoImage} src={knauLogo} />
                        <Text style={styles.logoText}>
                            КЫРГЫЗСКИЙ НАЦИОНАЛЬНЫЙ АГРАРНЫЙ УНИВЕРСИТЕТ
                        </Text>
                    </View>
                </View>
                <Text style={styles.title}>
                    ПЛЕМЕННОЕ СВИДЕТЕЛЬСТВО
                </Text>
                <Text style={styles.subtitle}>
                    БЫКИ (ИНОСТРАННЫЕ)
                </Text>
            </View>

            <View style={styles.serialNumbers}>
                <Text style={styles.serialText}>
                    Серия ПС 00 (серия)
                </Text>
                <Text style={styles.serialText}>
                    № {item.индивидуальныйНомер || "00000000"} (регистрационный номер)
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {item.фото ? (
                        <Image style={styles.image} src={item.фото} />
                    ) : (
                        <Text style={{ textAlign: "center", fontSize: 8, color: "#999" }}>
                            Фото отсутствует
                        </Text>
                    )}
                </View>

                <View style={styles.fieldContainer}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Индивидуальный номер:</Text>
                        <Text style={styles.value}>{item.индивидуальныйНомер || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Идентификационный номер:</Text>
                        <Text style={styles.value}>{item.идентификационныйНомер || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Инвентарный номер:</Text>
                        <Text style={styles.value}>{item.инвентарныйНомер || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Код семени:</Text>
                        <Text style={styles.value}>{item.кодСемени || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Оригинальная кличка:</Text>
                        <Text style={styles.value}>{item.оригинальнаяКличка || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Короткая кличка:</Text>
                        <Text style={styles.value}>{item.карточнаяКличка || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Кличка:</Text>
                        <Text style={styles.value}>{item.кличка || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Компания - поставщик семени:</Text>
                        <Text style={styles.value}>{item.компания_поставщикСемени || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Порода:</Text>
                        <Text style={styles.value}>{item.порода || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Линия:</Text>
                        <Text style={styles.value}>{item.линия || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Дата рождения:</Text>
                        <Text style={styles.value}>{item.датаРождения || "Не указано"}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.signatureSection}>
                <View style={styles.signature}>
                    <Text style={styles.signatureLabel}></Text>
                    <View style={styles.signatureLine} />
                    <Text>Дата: {new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.signature}>
                    <Text style={styles.signatureLabel}></Text>
                    <View style={styles.signatureLine} />
                    <Text>Дата: {new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>
                    Сертификат № {item.индивидуальныйНомер || "N/A"} • Выдан {new Date().toLocaleDateString()}
                </Text>
            </View>
        </Page>
    </Document>
);

export default BullsForeingPDF;
