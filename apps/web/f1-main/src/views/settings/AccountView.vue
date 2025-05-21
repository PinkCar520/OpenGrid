<template>
    <div class="settings-container">
        <div class="max-w-screen-xl mx-auto px-4 pb-12">
            <!-- <h1 class="text-2xl font-semibold text-gray-900">{{ t('settings.title') }}</h1> -->

            <div class="mt-4">
                <main>
                    <div class="space-y-10">
                        <!-- Organization Info -->
                        <section>
                            <div class="mb-6">
                                <h3 class="text-base font-semibold text-gray-900">
                                    {{ t('settings.organization.title') }}
                                </h3>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ t('settings.organization.description') }}
                                </p>
                            </div>

                            <el-form :model="accountSettingsForm" label-width="500px" label-position="right">
                                <el-form-item :label="t('settings.organization.name')">
                                    <el-input v-model="accountSettingsForm.organizationName"
                                        :placeholder="t('settings.organization.name')" />
                                    <p class="mt-1 text-sm text-gray-500">
                                        {{ t('settings.organization.nameHelp') }}
                                    </p>
                                </el-form-item>

                                <el-form-item :label="t('settings.organization.about')">
                                    <el-input v-model="accountSettingsForm.organizationBio" type="textarea" :rows="3" />
                                    <p class="mt-1 text-sm text-gray-500">
                                        {{ t('settings.organization.aboutHelp') }}
                                    </p>
                                </el-form-item>
                            </el-form>
                        </section>

                        <!-- Contact Info -->
                        <section class="pt-10 border-t border-gray-200">
                            <h3 class="section-title font-semibold text-gray-900">
                                {{ t('settings.contact.title') }}
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ t('settings.contact.description') }}</p>

                            <el-form :model="accountSettingsForm" label-width="500px" label-position="right">
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item :label="t('settings.contact.email')">
                                            <el-input v-model="accountSettingsForm.email" />
                                            <div class="email-options">
                                                <el-checkbox v-model="accountSettingsForm.showEmail">{{
                                                    t('settings.contact.showEmail')
                                                    }}</el-checkbox>
                                            </div>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item :label="t('settings.contact.address')">
                                            <el-input v-model="accountSettingsForm.address"
                                                :placeholder="t('settings.contact.description')" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item>
                                    <el-input v-model="accountSettingsForm.city"
                                        :placeholder="t('settings.contact.city')" />
                                </el-form-item>
                                <el-form-item>
                                    <div class="flex items-center gap-x-4" style="  width: 100%;  display: flex;align-items: center;justify-content: space-between">
                                        <el-select style="flex: 1;" v-model="accountSettingsForm.province"
                                            :placeholder="t('settings.contact.province')">
                                            <el-option v-for="province in provinces" :key="province" :value="province"
                                                :label="province" />
                                        </el-select>
                                        <el-input style="flex: 1;" v-model="accountSettingsForm.postalCode"
                                            :placeholder="t('settings.contact.postalCode')" />
                                    </div>
                                </el-form-item>


                                <el-form-item>
                                    <el-select v-model="accountSettingsForm.country"
                                        :placeholder="t('settings.contact.country')" style="width: 100%">
                                        <el-option v-for="country in countries" :key="country.code"
                                            :value="country.code" :label="country.name">
                                            <span class="flag">{{ country.flag }}</span>
                                            {{ country.name }}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </section>

                        <!-- Currency -->
                        <section class="pt-10 border-t border-gray-200">
                            <h3 class="section-title font-semibold text-gray-900">
                                {{ t('settings.currency.title') }}
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ t('settings.currency.description') }}</p>

                            <el-form :model="accountSettingsForm" label-width="500px" label-position="right">
                                <el-form-item :label="t('settings.currency.select')">
                                    <el-select v-model="accountSettingsForm.currency" style="width: 100%">
                                        <el-option value="CAD" label="CAD - Canadian Dollar" />
                                        <el-option value="USD" label="USD - US Dollar" />
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </section>

                        <!-- Actions -->
                        <div class="flex items-center justify-end gap-x-4 pt-6 border-t border-gray-200">
                            <button class="rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                {{ t('settings.actions.cancel') }}
                            </button>
                            <button
                                class="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700">
                                {{ t('settings.actions.save') }}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
// 移除未使用的图标导入
const { t } = useI18n()

const accountSettingsForm = ref({
    organizationName: '',
    organizationBio: '',
    email: '',
    showEmail: false,
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    currency: 'CAD',
})

const provinces = ['Ontario', 'Quebec', 'British Columbia']
const countries = [
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
]

const handleSave = () => {
    // 处理保存逻辑
    console.log('保存设置:', accountSettingsaccountSettingsForm.value)
}
</script>

<style lang="scss" scoped>
:deep(.el-form) {
    .el-form-item__label {
        @apply block text-sm font-medium leading-6 text-gray-900 mb-2;
    }

    .el-input__wrapper {
        @apply block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-900;
        box-shadow: none;
    }

    .el-textarea__inner {
        @apply min-h-[80px];
    }
}

// Dark mode
@media (prefers-color-scheme: dark) {
    :deep(.el-form) {
        .el-form-item__label {
            @apply text-gray-100;
        }

        .el-input__wrapper {
            @apply bg-gray-800/50 text-gray-100 ring-gray-700 focus:ring-gray-100;
        }
    }

    button {
        &.text-gray-900 {
            @apply text-gray-100;
        }

        &.bg-gray-900 {
            @apply bg-gray-100 text-gray-900 hover:bg-gray-300;
        }

        &.text-gray-500 {
            @apply text-gray-400 hover:text-gray-100;
        }
    }

    .text-gray-900 {
        @apply text-gray-100;
    }

    .text-gray-500 {
        @apply text-gray-400;
    }

    .border-gray-200 {
        @apply border-gray-800;
    }
}
</style>
