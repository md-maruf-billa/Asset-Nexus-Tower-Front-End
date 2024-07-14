import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const PdfDocument = () => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Text >Hello Maruf</Text>

        </Page>
    </Document>

);

export default PdfDocument;