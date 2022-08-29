<template>
  <div class="">
    <PageComponent>
      <template v-slot:header>
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl tracking-tight font-bold text-gray-900">
              Create role
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
                v-model="role.name"
                id="exampleInput90"
                placeholder="Name"
              />
            </div>
            <div class="form-group mb-6">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="
                  w-full
                  px-3
                  py-1.5
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  mt-1
                  block
                  sm:text-sm
                  border border-gray-300
                  rounded-md
                "
                v-model="role.description"
                placeholder="Description"
              />
            </div>
            <button
              type="submit"
              class="
                w-1/4
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
              Save
            </button>
          </form>
        </div>
      </div>
    </PageComponent>
  </div>
</template>
    
    <script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "@/axios";
import PageComponent from "@/components/PageComponent.vue";

export default {
  components: { PageComponent },
  setup() {
    const role = reactive({
      name: "",
      description: "",
    });

    const validation = ref([]);

    const router = useRouter();

    function submit() {
      axiosClient
        .post("/roles", role)
        .then(() => {
          router.push({
            name: "roles.index",
          });
        })
        .catch((error) => {
          validation.value = error.response.data.errors;
        });
    }

    return {
      role,
      validation,
      router,
      submit,
    };
  },
};
</script>