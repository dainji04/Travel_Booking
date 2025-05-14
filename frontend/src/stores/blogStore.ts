import axios from 'axios';
import { defineStore } from 'pinia';
import type { Blog } from '@/types/blog';
import { get } from '@vueuse/core';

export const blogStore = defineStore('blog', {
    state: () => ({
        blogs: [] as Blog[],
        blog: {} as Blog,
    }),
    getters: {
        getBlogs(state): Blog[] {
            return state.blogs;
        },
        getBlog(state): Blog {
            return state.blog;
        },
    },
    actions: {
        async getBlogList(page: number, limit: number) {
            try {
                const response = await axios.get(
                    `/blog?page=${page}&limit=${limit}`
                );
                this.blogs = response.data.data;
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        },
        async getBlogItem(id: number) {
            try {
                const response = await axios.get(`/blog/${id}`);
                this.blog = response.data;
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        },
    },
});
