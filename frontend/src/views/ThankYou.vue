<script setup lang="ts">
import { useRoute } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import { nextTick, ref } from 'vue';

import ProgressBarCheckOut from '@/components/ProgressBarCheckOut.vue';

const { date, adults, children, tourId, adultForms, childForms } =
    history.state;

console.log(date, adults, children, tourId, adultForms, childForms); // Debugging: Check the values

// import html2pdf from 'html2pdf.js';

// const isExportingPDF = ref(false);

// const exportPDF = async () => {
//     isExportingPDF.value = true;

//     await nextTick();
//     const element = document.getElementById('pdf-content');

//     const opt = {
//         margin: 0.5,
//         filename: 'booking-info.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
//     };

//     html2pdf().set(opt).from(element).save();
//     isExportingPDF.value = false;
// };
</script>

<template>
    <pagination
        title="Thank You"
        :link="['home', 'thankYou']"
        :pagination="['Homepage', 'Thank You']"
    />
    <div class="thankyou">
        <ProgressBarCheckOut :step="4" />
        <div class="container" id="pdf-content">
            <h1 class="heading">
                Thank you for booking the trip. Please check your email for
                confirmation. Below is your booking detail:
            </h1>
            <div class="bill">
                <h1 class="bill_title">Booking Detail</h1>
                <table class="bill_table">
                    <tr class="bill_item">
                        <td>
                            <h3>Booking Id:</h3>
                        </td>
                        <td>
                            <p>5169</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Trip Details:</h3>
                        </td>
                        <td>
                            <p>HA NOI - CAPITAL OF VIETNAM</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Trip Id:</h3>
                        </td>
                        <td>
                            <p>5079</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Trip Code:</h3>
                        </td>
                        <td>
                            <p>WTE-2957</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Trip Cost:</h3>
                        </td>
                        <td>
                            <p>
                                {{ adults }} x 600$ =
                                {{ Number(adults) * 600 }}$
                            </p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Trip Start Date:</h3>
                        </td>
                        <td>
                            <p>{{ date }}</p>
                        </td>
                    </tr>
                    <!-- Payment detail -->
                    <tr class="bill_item">
                        <td colspan="2">
                            <h3 class="index">Payment Details</h3>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Partial Payment:</h3>
                        </td>
                        <td>
                            <p>600$</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Subtotal:</h3>
                        </td>
                        <td>
                            <p>0</p>
                        </td>
                    </tr>
                    <tr class="bill_item">
                        <td>
                            <h3>Total:</h3>
                        </td>
                        <td>
                            <p>600$</p>
                        </td>
                    </tr>
                </table>
                <!-- <button @click="exportPDF">Export PDF</button> -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/thankyou';
</style>
