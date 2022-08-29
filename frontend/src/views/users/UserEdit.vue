<template>
  <div class="">
    <PageComponent>
      <template v-slot:header>
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl tracking-tight font-bold text-gray-900">
              Update user
            </h1>
          </div>
        </div>
      </template>
      <div class="flex items-center justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-white w-2/4">
          <form @submit.prevent="submit">
            <div
              v-if="Object.keys(validation).length"
              class="flex-col items-stretch text-sm"
            >
              <div v-for="(field, i) of Object.keys(validation)" :key="i">
                <div v-for="(error, ind) of validation[field] || []" :key="ind">
                  <span class="px-2 py-2 mb-4 text-red-600 rounded shadow">
                    * {{ error }}
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group mb-6">
              <input
                type="text"
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                v-model="user.name"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="email"
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                v-model="user.email"
                id="exampleInput91"
                placeholder="Email address"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="password"
                class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                v-model="user.password"
                id="exampleInput90"
                placeholder="Password"
              />
            </div>
            <div class="form-group mb-6">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="
                  mt-1
                  block
                  w-full
                  py-2
                  px-3
                  border border-gray-300
                  bg-white
                  rounded-md
                  shadow-sm
                  focus:outline-none
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  sm:text-sm
                "
                v-model="user.role_id"
              >
                <option v-for="role in roles" :value="role.id" :key="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>
            <button
              type="submit"
              class=" w-1/4
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
              "
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </PageComponent>
  </div>
</template>
  <script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axiosClient from "@/axios";
export default {
  setup() {
    let user = ref([]);
    let roles = ref([]);
    // const userForm = reactive({
    //   name: "",
    //   email: "",
    //   password: "",
    //   password_confirmation: "",
    //   role_id: "",
    // });
    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      // fetch api from laravel backend
      axiosClient
        .get(`/users/${route.params.id}`)
        .then((response) => {
          user.value = response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      axiosClient
        .get("/roles")
        .then((res) => {
          console.log(res.data);
          roles.value = res.data;
        })
        .catch((error) => {
          console.log(error.res.data);
        });
    });
    function submit() {
      let userData = user.value;
      axiosClient
        .put(`/users/${route.params.id}`, userData)
        .then(() => {
          router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          validation.value = error.response.data.errors;
        });
    }
    return {
      user,
      //   userForm,
      validation,
      router,
      submit,
      roles,
    };
  },
};
</script>