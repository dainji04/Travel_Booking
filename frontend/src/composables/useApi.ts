import axios from 'axios';
import { ref } from 'vue';

export function useApi(endpoint: string) {
    const data = ref([]);
    const fetchData = async () => {
        const response = await axios.get(endpoint);
        data.value = response.data;
    };
    return { data, fetchData };
}
