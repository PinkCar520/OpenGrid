<template>
  <router-view v-slot="{ Component }">
        <keep-alive :max="10">
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name"/>
        </keep-alive>
        <!-- <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name"/> -->
      </router-view>
  </template>
  