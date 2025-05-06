// components/BreedingStockPDF.js
import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import robotoFont from "../assets/fonts/Roboto-Regular.ttf";
import robotoBoldFont from "../assets/fonts/Roboto-Bold.ttf";

// Регистрируем шрифты
Font.register({
    family: "Roboto",
    fonts: [
        { src: robotoFont, fontWeight: 400 }, // Regular
        { src: robotoBoldFont, fontWeight: "bold" }, // Bold
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
        padding: 30, // Уменьшили padding с 30 до 20
        backgroundColor: "#f8f5e9",
        position: "relative",
    },
    outerBorder: {
        position: "absolute",
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
        border: "5 solid #d4a017",
        borderRadius: 8,
    },
    innerBorder: {
        position: "absolute",
        top: 25,
        left: 25,
        right: 25,
        bottom: 25,
        border: "2 solid #8b5a2b",
        borderStyle: "dashed",
    },
    watermark: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        opacity: 0.1,
        fontSize: 60,
        color: "#d4a017",
        fontWeight: "bold",
    },
    header: {
        textAlign: "center",
        marginBottom: 15, // Уменьшили с 20 до 15
        paddingBottom: 8, // Уменьшили с 10 до 8
        borderBottom: "3 solid #d4a017",
    },
    title: {
        fontSize: 26, // Уменьшили с 30 до 26
        fontWeight: "bold",
        color: "#8b5a2b",
        marginBottom: 4, // Уменьшили с 5 до 4
    },
    subtitle: {
        fontSize: 14, // Уменьшили с 16 до 14
        color: "#666",
    },
    content: {
        padding: 20, // Уменьшили с 20 до 15
        border: "1 solid #d4a017",
        borderRadius: 5,
        backgroundColor: "#fffef0",
        marginBottom: 15, // Уменьшили с 20 до 15
    },
    imageContainer: {
        textAlign: "center",
        marginBottom: 15, // Уменьшили с 20 до 15
    },
    image: {
        width: 80, // Уменьшили с 100 до 80
        height: 80, // Уменьшили с 100 до 80
        borderRadius: 40, // Уменьшили пропорционально
        border: "2 solid #d4a017",
        backgroundColor: "#fff",
    },
    fieldContainer: {
        marginBottom: 5,
    },
    field: {
        fontSize: 11, // Уменьшили с 12 до 11
        marginBottom: 6, // Уменьшили с 8 до 6
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1 dashed #d4a017",
        paddingBottom: 4, // Уменьшили с 5 до 4
    },
    label: {
        fontWeight: "bold",
        color: "#8b5a2b",
        width: "40%",
    },
    value: {
        color: "#333",
        width: "60%",
        textAlign: "right",
    },
    signatureSection: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signature: {
        textAlign: "center",
        fontSize: 11, // Уменьшили с 12 до 11
        color: "#666",
        width: "40%",
    },
    signatureLine: {
        borderTop: "1 solid #8b5a2b",
        width: 100, // Уменьшили с 120 до 100
        marginTop: 4, // Уменьшили с 5 до 4
        marginBottom: 4, // Уменьшили с 5 до 4
        marginLeft: "auto",
        marginRight: "auto",
    },
    footer: {
        textAlign: "center",
        marginTop: 15, // Уменьшили с 20 до 15
        fontSize: 9, // Уменьшили с 10 до 9
        color: "#999",
        borderTop: "1 solid #d4a017",
        paddingTop: 5, // Уменьшили с paddingBottom 20 до paddingTop 5
    },
});

const BreedingStockPDF = ({ item }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Элементы с fixed рендерятся на каждой странице */}
            <View style={styles.outerBorder} fixed />
            <View style={styles.innerBorder} fixed />
            <Text style={styles.watermark} fixed>
                СЕРТИФИКАТ
            </Text>

            <View style={styles.header}>
                <Text style={styles.title}>Сертификат</Text>
                <Text style={styles.subtitle}>Маточного поголовья</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {item.фото ? (
                        <Image style={styles.image} src={item.фото} />
                    ) : (
                        <Text
                            style={{ textAlign: "center", fontSize: 10, color: "#999" }}
                        >
                            Фото отсутствует или недоступно
                        </Text>
                    )}
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
                        <Text style={styles.value}>{item.кличка || "Не указано"}</Text>
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
                        <Text style={styles.value}>{item.порода || "Не указано"}</Text>
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
                        <Text style={styles.value}>{item.семейство || "Не указано"}</Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Кому принадлежит:</Text>
                        <Text style={styles.value}>
                            {item.комуПринадлежит || "Не указано"}
                        </Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Назначение коровы:</Text>
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
                        <Text style={styles.label}>Группа крови:</Text>
                        <Text style={styles.value}>
                            {item.группаКрови || "Не указано"}
                        </Text>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Происхождение:</Text>
                        <Text style={styles.value}>
                            {item.происхождение || "Не указано"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.signatureSection}>
                <View style={styles.signature}>
                    <Text>Ответственное лицо</Text>
                    <View style={styles.signatureLine} />
                    <Text>Дата: {new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.signature}>
                    <Text>Ветеринарный инспектор</Text>
                    <View style={styles.signatureLine} />
                    <Text>Дата: {new Date().toLocaleDateString()}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>
                    Сертификат № {item.индивидуальныйНомер || "N/A"} • Выдан{" "}
                    {new Date().toLocaleDateString()}
                </Text>
            </View>
        </Page>
    </Document>
);

export default BreedingStockPDF;
