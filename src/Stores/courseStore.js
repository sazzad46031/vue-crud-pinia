import { defineStore } from 'pinia';
import axios from 'axios';



export const useCourseStore = defineStore('courseStore', {
    state: () => ({
        courses: [],
        loading: false,
    }),
    actions: {
        async getCourses() {
            this.loading = true;
            try {
                const res = await axios.get('https://apitest.shabujglobal.africa/api/courses');
                this.courses = res.data.data;
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                this.loading = false;
            }
        },

        async addCourse(course) {

            try {
                const res = await axios.post('https://apitest.shabujglobal.africa/api/courses', course);
                if (res.data.status) {
                    this.courses.push(res.data.data);
                }
            } catch (error) {
                console.error('Error adding course:', error);
            }
        },

        async deleteCourse(courseId) {
            try {
                const res = await axios.delete(`https://apitest.shabujglobal.africa/api/courses/${courseId}`);
                if (res.data && res.data.status) {
                    // this.courses = this.courses.filter(course => course.id !== courseId);
                    const index = this.courses.findIndex(course => course.id === courseId);
                    if (index !== -1) {
                        this.courses.splice(index, 1);
                    }
                }
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        },

        async editCourse(course) {
            console.log("course", course)
            try {
                const res = await axios.put(`https://apitest.shabujglobal.africa/api/courses/${course.id}`, course);

                if (res.data.status) {
                    
                    const index = this.courses.findIndex(c => c.id === course.id);
                    if (index !== -1) {
                        this.courses[index] = res.data.data;
                    }
                }
            } catch (error) {
                console.error('Error updating course:', error);
            }
        },
    },
});
