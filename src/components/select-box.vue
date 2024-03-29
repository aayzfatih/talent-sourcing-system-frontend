<template>
  <!-- <div ref="selectbox" class="space-y-2"> -->
  <div ref="selectbox" class="">
    <label :class="labelClass == '' ? 'block text-smfont-medium font-medium' : labelClass
      " v-if="label">{{ $t(label) }}</label>
    <div class="relative">
      <button type="button"
        class="w-full min-w-[12rem] relative bg-white dark:bg-gray-800 border dark:hover:bg-gray-700 transition-colors rounded-md flex justify-between px-2 py-2 focus:outline-none sm:text-sm"
        :class="[
          showError
            ? 'border-rose-400 dark:border-rose-600'
            : 'border-gray-300 dark:border-gray-600',
        ]" @click="show = !show">
        <span class="block truncate" v-if="multiple">
          {{
            selectedOptions && selectedOptions.length > 0
            ? options.filter((option) =>
              selectedOptions.includes(option[dataLabel])
            )[0][optionLabel]
            : placeholder
          }}
          {{
            selectedOptions && selectedOptions.length > 1
            ? `+${selectedOptions.length - 1} more`
            : ""
          }}
        </span>

        <span class="block truncate" v-if="!multiple">
          {{
            options.find((option) => selectedOption === option[dataLabel])
            ? options.find((option) => selectedOption === option[dataLabel])[
            optionLabel
            ]
            : placeholder
          }}
        </span>

        <span class="flex items-center" v-if="selectedOption > 0" @click="clearSelected()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <span class="flex items-center" v-if="selectedOption < 1">
          <svg class="w-4 h-4 transform transition" :class="[show ? 'rotate-180' : null]" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <span class="text-rose-500 text-xs leading-3" v-if="showError">
        {{ $t("general.field_required", { field: $t(label) }) }} *
      </span>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <ul
          class="absolute z-[509999] mt-1 w-full bg-white dark:bg-gray-900 border border-gray-600 dark:border-gray-600 max-h-56 rounded-md py-1 overflow-auto focus:outline-none sm:text-sm"
          v-if="show">
          <div class="my-2 px-2" v-if="searchable">
            <input type="text" class="input-text" :placeholder="$t('general.search')" v-model="searchText" />
          </div>

          <span class="flex justify-center text-gray-800 dark:text-gray-500 text-xs font-medium my-5 select-none"
            v-if="filteredData.length < 1">{{ $t("general.no_records") }}</span>

          <div
            class="flex justify-between items-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors px-2 py-2"
            v-for="(item, index) in filteredData" :key="index" :class="{
              'bg-gray-300 dark:bg-gray-700': isSelected(item[dataLabel]),
            }" @click="selectItem(item[dataLabel])">
            <span class="ml-3 block truncate" v-if="multiple" :class="[
              selectedOptions.includes(item.id)
                ? 'font-semibold'
                : 'font-normal',
            ]">{{ item[optionLabel] }}</span>
            <span class="ml-3 block truncate" :class="[
              selectedOption === item.id ? 'font-semibold' : 'font-normal',
            ]" v-else>{{ item[optionLabel] }}</span>
            <span class="text-indigo-600 inset-y-0 right-0 flex items-center"
              v-if="multiple && selectedOptions.includes(item.id)">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  options: {
    default: () => [],
  },
  modelValue: {
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: null,
  },
  labelClass: {
    type: String,
    default: "",
  },
  optionLabel: {
    default: "name",
  },
  dataLabel: {
    default: "id",
  },
  searchable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const show = ref(false);
const selectbox = ref(null);

const selectedOptions = ref([]);
const selectedOption = ref("");
const searchText = ref("");

const emits = defineEmits(["update:modelValue"]);

const showError = computed(() => {
  if (props.required) {
    if (props.multiple) {
      return selectedOptions.value.length < 1;
    } else {
      return (
        selectedOption.value === "" ||
        selectedOption.value === null ||
        selectedOption.value === undefined
      );
    }
  }
  return false;
});

function selectItem(id) {
  if (props.multiple) {
    const selected = selectedOptions.value.find((item) => item === id);
    if (selected) {
      selectedOptions.value = selectedOptions.value.filter(
        (item) => item !== id
      );
    } else {
      selectedOptions.value.push(id);
    }
    emits("update:modelValue", selectedOptions.value);
  } else {
    const selected = selectedOption.value === id;
    if (selected) {
      selectedOption.value = null;
    } else {
      selectedOption.value = id;
    }
    emits("update:modelValue", selectedOption.value);
    show.value = false;
  }
}
const filteredData = computed(() => {
  const data = props.options;
  const search = searchText.value.toLowerCase();
  return data.filter((item) =>
    item[props.optionLabel].toLowerCase().includes(search)
  );
});

function isSelected(id) {
  if (props.multiple) {
    return selectedOptions.value.includes(id);
  } else {
    return selectedOption.value === id;
  }
}

if (props.modelValue) {
  if (props.multiple) {
    selectedOptions.value = props.modelValue;
  } else {
    selectedOption.value = props.modelValue;
  }
}

function clearSelected() {
  selectedOption.value = null;
  emits("update:modelValue", null);
}

document.addEventListener("click", clickOutside);
onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside);
});

function clickOutside(e) {
  if (selectbox.value && !selectbox.value.contains(e.target)) {
    show.value = false;
  }
}
</script>
