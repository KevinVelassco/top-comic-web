<template>
  <div class="flex justify-center items-center min-h-screen gradient">
    <div class="max-w-xl text-center px-6 lg:px-8 mx-auto">
      <div class="flex flex-col">
        <div class="flex items-center justify-center mb-5">
          <h1 class="text-5xl font-semibold border-e border-gray-300 tracking-wider pe-4">404</h1>
          <span class="text-lg text-gray-500 uppercase tracking-wider ms-4">Not Found</span>
        </div>
        <RouterLink
          :to="{ name: 'dashboard' }"
          class="inline-flex justify-center items-center text-center hover:text-blue-600 font-medium transition py-2.5"
        >
          <svg class="w-3 h-auto me-2" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.3964 7C15.9487 7 16.3964 7.44771 16.3964 8C16.3964 8.55228 15.9487 9 15.3964 9L3.31064 9L8.60353 14.2929C8.99405 14.6834 8.99405 15.3166 8.60353 15.7071C8.21301 16.0976 7.57984 16.0976 7.18932 15.7071L0.366093 8.88388C-0.122062 8.39573 -0.12206 7.60427 0.366093 7.11612L7.18932 0.292893C7.57984 -0.0976318 8.21301 -0.0976318 8.60353 0.292893C8.99405 0.683417 8.99405 1.31658 8.60353 1.70711L3.31064 7L15.3964 7Z"
              fill="currentColor"
            ></path>
          </svg>
          Página inicial
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background-image: linear-gradient(120deg, #fffdfd 0%, #f9f9f9 100%);
}
</style>
