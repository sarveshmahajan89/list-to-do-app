import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoListComponent from '../ToDoListComponent.vue'

describe('ToDoListComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ToDoListComponent, {
      props: {
        userInput: 'Test to do item',
        selectedPriority: 'low'
      }
    })
  })

  it('emits input value when changed', async () => {
    await wrapper.find('input').setValue('New item value')
    expect(wrapper.find('input').element.value).toBe('New item value')
  })

  it('emits select value when changed', async () => {
    await wrapper.find('select').setValue('low')
    expect(wrapper.find('select').element.value).toBe('low')
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
})
