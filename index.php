<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PM Knowledge Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="bg-white shadow-md relative z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <i class="fas fa-book text-blue-600 text-2xl"></i>
                        <span class="ml-2 text-xl font-semibold text-gray-900">PM Knowledge Hub</span>
                    </div>
                    <div class="flex items-center" v-if="user">
                        <button class="p-2 rounded-full hover:bg-gray-100">
                            <i class="fas fa-bell text-gray-600"></i>
                        </button>
                        <div class="ml-4 flex items-center">
                            <img :src="user.avatar" class="h-8 w-8 rounded-full" :alt="user.name">
                            <span class="ml-2 text-sm font-medium text-gray-700">{{ user.name }}</span>
                            <span class="ml-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                                {{ user.role }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Login Form -->
        <div v-if="!user" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="login">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">Email address</label>
                            <input v-model="loginForm.email" id="email-address" name="email" type="email" required 
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address">
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input v-model="loginForm.password" id="password" name="password" type="password" required 
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                                placeholder="Password">
                        </div>
                    </div>

                    <div>
                        <button type="submit" 
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Main Content -->
        <div v-else class="flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-white shadow-md h-[calc(100vh-4rem)]">
                <nav class="mt-8">
                    <a v-for="item in menuItems" :key="item.path" 
                       :href="item.path"
                       class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        <i :class="item.icon"></i>
                        <span class="ml-3">{{ item.label }}</span>
                    </a>
                </nav>
            </aside>

            <!-- Content Area -->
            <main class="flex-1 p-6">
                <component :is="currentView"></component>
            </main>
        </div>
    </div>

    <script>
        const { createApp } = Vue

        createApp({
            data() {
                return {
                    user: null,
                    loginForm: {
                        email: '',
                        password: ''
                    },
                    menuItems: [
                        { path: '#/', icon: 'fas fa-home', label: 'Home' },
                        { path: '#/tools', icon: 'fas fa-tools', label: 'Tools' },
                        { path: '#/community', icon: 'fas fa-users', label: 'Community' },
                        { path: '#/resources', icon: 'fas fa-book', label: 'Resources' }
                    ]
                }
            },
            methods: {
                async login() {
                    try {
                        const response = await fetch('api/auth.php?action=login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(this.loginForm)
                        });
                        const data = await response.json();
                        if (data.success) {
                            this.user = data.user;
                        }
                    } catch (error) {
                        console.error('Login error:', error);
                    }
                },
                async checkAuth() {
                    try {
                        const response = await fetch('api/auth.php?action=check');
                        const data = await response.json();
                        if (data.success) {
                            this.user = data.user;
                        }
                    } catch (error) {
                        console.error('Auth check error:', error);
                    }
                }
            },
            mounted() {
                this.checkAuth();
            }
        }).mount('#app')
    </script>
</body>
</html>