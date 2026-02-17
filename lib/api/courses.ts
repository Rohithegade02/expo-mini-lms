import { APIResponse } from '../../types/api';
import { Course, Instructor } from '../../types/course';
import { apiClient } from './client';

export const courseApi = {
    /**
     * Fetches random users to be used as instructors
     */
    getInstructors: async (count: number = 10): Promise<APIResponse<any>> => {
        return apiClient.get<APIResponse<any>>(`/public/randomusers?results=${count}`);
    },

    /**
     * Fetches random products to be used as courses
     */
    getCourses: async (count: number = 10): Promise<APIResponse<any>> => {
        return apiClient.get<APIResponse<any>>(`/public/randomproducts?results=${count}`);
    },

    /**
     * Fetches and maps products and instructors to Course structure
     */
    getMappedCourses: async (count: number = 10): Promise<Course[]> => {
        try {
            const [instructorsRes, productsRes] = await Promise.all([
                courseApi.getInstructors(count),
                courseApi.getCourses(count),
            ]);

            const instructorsData = instructorsRes.data.data;
            const productsData = productsRes.data.data;

            return productsData.map((product: any, index: number) => {
                const instructorRaw = instructorsData[index % instructorsData.length];

                const instructor: Instructor = {
                    id: String(instructorRaw.id.value || index),
                    name: {
                        first: instructorRaw.name.first,
                        last: instructorRaw.name.last,
                        title: instructorRaw.name.title,
                    },
                    avatar: instructorRaw.picture.large,
                    email: instructorRaw.email,
                };

                const course: Course = {
                    id: String(product.id),
                    title: product.title,
                    description: product.description,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    instructor,
                    category: product.category,
                    rating: product.rating,
                    isBookmarked: false,
                    isEnrolled: false,
                    progress: 0,
                };

                return course;
            });
        } catch (error) {
            console.error('Error fetching mapped courses:', error);
            throw error;
        }
    },
};
