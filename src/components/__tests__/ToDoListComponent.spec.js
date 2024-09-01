import { describe, it, expect } from 'vitest'
import ToDoListComponent from '../ToDoListComponent.vue'

describe('ToDoListComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(ToDoListComponent)
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
