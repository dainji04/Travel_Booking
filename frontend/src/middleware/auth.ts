// middleware/auth.ts
import axios from 'axios';
import { authStore } from '@/stores/auth'; // Pinia store bạn tạo
import { useRouter } from 'vue-router';

export default async function authMiddleware() {
    const token = localStorage.getItem('accessToken');
    const router = useRouter();
    const useAuth = authStore();

    if (!token) {
        router.push('/login');
        return;
    }

    try {
        const response = await axios.get('user/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 201) {
            throw new Error('Token expired');
        }

        useAuth.setUser(response.data.user);
    } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('Authtoken');
        router.push('/login');
    }
}
