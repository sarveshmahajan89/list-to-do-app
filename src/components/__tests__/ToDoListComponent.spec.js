import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoListComponent from '../ToDoListComponent.vue'

describe('ToDoListComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ToDoListComponent, {
      props: {
        userInput: 'Test to do item',
        selectedPriority: 'optional'
      }
    })
  })

  it('emits input value when changed', async () => {
    await wrapper.find('input').setValue('New item value')
    expect(wrapper.find('input').element.value).toBe('New item value')
  })

  it('emits select value when changed', async () => {
    await wrapper.find('select').setValue('optional')
    expect(wrapper.find('select').element.value).toBe('optional')
  })

  it('has add button in default view', async () => {
    await wrapper.find('.add-edit-button');
    expect(wrapper.find('.add-edit-button').exists()).toBe(true);
  })

  it('has clear button in default view', async () => {
    await wrapper.find('#clear-button');
    expect(wrapper.find('#clear-button').exists()).toBe(true);
  })

  it('has clear button in default view', async () => {
    await wrapper.find('#sort-button');
    expect(wrapper.find('#sort-button').exists()).toBe(true);
  })

  it('has table data displayed after adding value', async () => {
    await wrapper.find('input').setValue('New item value')
    await wrapper.find('select').setValue('optional')
    await wrapper.find('.add-edit-button').trigger("click")
    expect(wrapper.find('li').text()).toContain('New item value')
    expect(wrapper.find('li').text()).toContain('optional')
  })

  it('has table data empty after deleting list value', async () => {
    await wrapper.find('input').setValue('New item value')
    await wrapper.find('select').setValue('optional')
    await wrapper.find('.add-edit-button').trigger("click")
    await wrapper.find('.fa-trash').trigger("click")
    expect(wrapper.find('li').text()).toBeNull
  })

  it('has table data empty after clear button click', async () => {
    await wrapper.find('input').setValue('New to do')
    await wrapper.find('select').setValue('moderate')
    await wrapper.find('.add-edit-button').trigger("click")
    await wrapper.find('#clear-button').trigger("click")
    expect(wrapper.find('ul').text()).toBeNull
  })
})
