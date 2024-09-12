
import { defineStore } from "pinia";



export const useCourseStore = defineStore('courseStore',{
    state: () => ({
        courses : [],
        loading : false
    }),
    actions: {
        
        async getCourses() {
            this.loading = true;
            const res = await fetch('https://apitest.shabujglobal.africa/api/courses')
            const data = await res.json()   
            
            this.courses = data.data
            this.loading = false;
        },
        async addCourse(course) {
            
            try {
                
                const res = await fetch('https://apitest.shabujglobal.africa/api/courses', {
                    method: 'POST',
                    body: JSON.stringify(course),
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await res.json();

                  if (data.status) {
                    
                    this.courses = [...this.courses, data.course];
                     
                    console.log( data.data );
                }
                
            } catch (error) {
                console.error('Error adding course:', error);
            }
        },
        async deleteCourse(courseId) {
            try {
                const res = await fetch(`https://apitest.shabujglobal.africa/api/courses/${courseId}`, {
                    method: 'DELETE',
                });
                
                const data = await res.json();
                
                if (data.status) {
                    this.courses = this.courses.filter(course => course.id !== courseId);
                }
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        },
        async editCourse(course) {
            try {
                const res = await fetch(`https://apitest.shabujglobal.africa/api/courses/${course.id}`, {
                    method: 'PUT', 
                    body: JSON.stringify(course),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                const data = await res.json();
                
                if (data.status) {
                    
                    const index = this.courses.findIndex(c => c.id === course.id);
                    if (index !== -1) {
                        this.courses[index] = data.course; 
                    }
                    
                }
            } catch (error) {
                console.error('Error updating course:', error);
            }
        }
    } 
})