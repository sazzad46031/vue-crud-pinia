<script setup>


import { ref, watch } from 'vue';
import { useCourseStore } from './Stores/courseStore';

const courseStore = useCourseStore()
const courses = ref(courseStore.courses);

watch(() => courseStore.courses, (newCourses) => {
    courses.value = newCourses;  
});
courseStore.getCourses();

const country_name = ref('');
const university_name = ref('');
const course_name = ref ('');
const tuition_fee = ref('');
const currentCourseId = ref(null);

const handleSubmit = async () => {
    try {
        if (currentCourseId.value) {
            // Editing an existing course
            await courseStore.editCourse({
                id: currentCourseId.value,
                country_name: country_name.value,
                university_name: university_name.value,
                course_name: course_name.value,
                tuition_fee: tuition_fee.value,
            });
        } else {
            // Adding a new course
            await courseStore.addCourse({
                country_name: country_name.value,
                university_name: university_name.value,
                course_name: course_name.value,
                tuition_fee: tuition_fee.value,
            });
        }

        // Clear form after submit
        clearForm();
    } catch (error) {
        console.error('Error while submitting form:', error);
    }
};

const handleEditClick = (course) => {
    currentCourseId.value = course.id;
    country_name.value = course.country_name;
    university_name.value = course.university_name;
    course_name.value = course.course_name;
    tuition_fee.value = course.tuition_fee;
    
};
const openAddCourseModal = () => {
    clearForm();
    document.getElementById('my_modal_3').showModal();
};
const clearForm = () => {
    currentCourseId.value = null;
    country_name.value = '';
    university_name.value = '';
    course_name.value = '';
    tuition_fee.value = '';
    document.getElementById('my_modal_3').close()
};
</script>
<template>
    <div class="max-w-screen-2xl mx-auto">
        <div class="vue-card-header flex justify-between border p-3">
            <h2 class="font-semibold text-2xl pt-2">Courses</h2>
            <div>
                <button class="btn btn-info text-white" onclick="my_modal_3.showModal()">Add course</button>
                <dialog id="my_modal_3" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button @click="clearForm" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div class="max-w-screen-2xl mx-auto p-10">
                            <h1 class="text-5xl text-center">{{ currentCourseId ? 'Edit Course' : 'Add Course' }}</h1>
                            <form @submit.prevent="handleSubmit">
                                <div class="md:flex mb-8">
                                    <div class="form-control md:w-1/2">
                                        <label class="label">
                                            <span class="label-text">Country Name</span>
                                        </label>
                                        <input type="text" placeholder="Country Name" name="Country Name" v-model="country_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                    <div class="form-control md:w-1/2 ml-4">
                                        <label class="label">
                                            <span class="label-text">University Name</span>
                                        </label>
                                        <input type="text" placeholder="University Name" name="University Name" v-model="university_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                </div>
                                <div class="md:flex mb-8">
                                    <div class="form-control md:w-1/2">
                                        <label class="label">
                                            <span class="label-text">Course Name</span>
                                        </label>
                                        <input type="text" placeholder="Course Name" name="Course Name" v-model="course_name"
                                            class="input w-full input-bordered" />
                                    </div>
                                    <div class="form-control md:w-1/2 ml-4">
                                        <label class="label">
                                            <span class="label-text">Tuition Fee</span>
                                        </label>
                                        <input type="number" placeholder="Tuition Fee" name="Tuition Fee"
                                            v-model="tuition_fee" class="input w-full input-bordered" />
                                    </div>
                                </div>
                                <input type="submit" :value="currentCourseId ? 'Edit Course' : 'Add Course'" class="btn btn-block text-white bg-purple-400" />
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
        <div class="vue-card-body">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Country Name</th>
                            <th>University Name</th>
                            <th>Cousre Name</th>
                            <th>Tuition Fee</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="course in courses" :key="course.id">
                            <td>{{ course.id }}</td>
                            <td>{{ course.country_name }}</td>
                            <td>{{ course.university_name }}</td>
                            <td>{{ course.course_name }}</td>
                            <td>{{ course.tuition_fee }}</td>
                            <td>{{ course.created_at }}</td>
                            <td>{{ course.updated_at }}</td>
                            <td class="space-x-4">
                                
                                <button @click="handleEditClick(course)" onclick="my_modal_3.showModal()" class="btn btn-success text-white">Edit</button>
                                
                                <button @click="courseStore.deleteCourse(course.id)" class="btn btn-error text-white">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>   
    <div class="text-center text-green-600" v-if="courseStore.loading">Loading Courses...</div>
</template>