<script setup lang="ts" generic="T extends Record<string, any>">
type BaseTableProps<T> = {
  headers: (keyof T | string)[]
  rows: T[]
  rowKey: (row: T) => string
}

defineProps<BaseTableProps<T>>()
</script>

<template>
  <section data-slot='table-wrapper' class='relative h-[calc(100vh-10rem)] lg:w-[calc(100vw-15rem)] w-full overflow-x-auto'>
    <table data-slot='table' class='w-full caption-bottom text-sm font-normal border border-slate-200'>
        <thead data-slot='table-header' class='[&_tr]:border-b text-lg bg-sky-200 '>
            <tr data-slot='table-header-row' class='hover:bg-hover data-[state=selected]:bg-success border-b border-slate-200 transition-colors duration-300'>
                <th data-slot='table-header-cell' v-for="header in headers" :key="String(header)" class='text-foreground p-3 text-center align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px] max-w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap'>{{ String(header) }}</th>
            </tr>
        </thead>
        <tbody data-slot='table-body' class='[&_tr:last-child]:border-0'>
            <tr data-slot='table-row' v-for="row in rows" :key="rowKey(row)" class='hover:bg-slate-200 data-[state=selected]:bg-success border-b border-slate-200 transition-colors duration-300'  >
                <td data-slot='table-cell' v-for="header in headers" :key="String(header)" class='p-3 text-center align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px] max-w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap'>
                <slot :name="`cell-${String(header)}`" :row="row" :item="row[header]">
                    {{ row[header] }}
                </slot>
            </td>
            </tr>
        </tbody>
    </table>
    <div data-slot='no-data' v-if="!rows.length" class='flex items-center text-center justify-center h-40 text-xl text-gray-500'>
        <slot name="no-data" />
    </div>
  </section>
</template>