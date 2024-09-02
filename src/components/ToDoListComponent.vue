<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="todo-box">
          <div class="main-todo-container fl-box">
            <div class="main-todo-container-item">
              <input type="text" id="todo-list-item" title="Add item to the list" placeholder="Enter to do item" v-model="userInput">
              <select v-model="selectedPriority" title="Select priority">
                <option value="" :selected disabled>Priority</option>
                <option v-for="(field) in priorityList" :value="field.value" :class="field.class">{{field.text}}</option>
              </select>
            </div>
            <button class="add-items add-edit-button" title="Add or Update" @click="addItem">{{isEditMode ? 'Update' : 'ADD'}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="todo-box toolbar">
          <div class="btn-group fr-box" role="group" aria-label="Basic example">
            <button id="sort-button" class="btn btn-primary border-right" @click="sortList" title="Sort List based on priority"><i class="fa fa-sort"></i></button>
            <button id="clear-button" class="btn btn-primary" @click="clearAll" title="Clear list">CLEAR</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="todo-box">
          <div class="main-todo-container fl-box todo-listing">
            <ul class="list-items">
              <li title="Click to edit" class="list-row" v-for="(item, index) in list" @click="editItem(index)">
                <span class='todo-text'>{{item.value}}</span>&nbsp;
                <span class="badge" :class="item.priority === 'critical' ? 'bg-danger' : item.priority === 'moderate' ? 'bg-warning' : 'bg-info'">{{ item.priority }}</span>
                <a class='remove-icon text-right'>
                  <i class='fa fa-trash' @click="deleteItem(index, $event)" title="Delete"></i>
                </a>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      userInput: '',
      selectedPriority: '',
      list: JSON.parse(localStorage.getItem('toDoList')) || [],
      priorityList: [
        {
          value: 'critical',
          class: "bg-danger",
          text: 'Critical',
          priority: 0
        },
        {
          value: 'moderate',
          class: "bg-warning",
          text: 'Moderate',
          priority: 1
        },
        {
          value: 'optional',
          class: "bg-info",
          text: 'Optional',
          priority: 2
        }
      ],
      isEditMode: false,
      selectedItem: 0
    };
  },
  methods: {
    addItem() {
      if (this.userInput.trim() !== '' && this.selectedPriority !== '') {
        const newItem = {
          id: Math.random(),
          value: this.userInput.trim(),
          priority: this.selectedPriority
        };
        if (this.isEditMode) {
          this.list[this.selectedItem].value = this.userInput;
          this.list[this.selectedItem].priority = this.selectedPriority;
          localStorage.setItem('toDoList', JSON.stringify(this.list));
        } else {
          this.list.push(newItem);
          localStorage.setItem('toDoList', JSON.stringify(this.list));
        }
        this.userInput = '';
        this.selectedPriority = '';
        this.isEditMode = false;
      }
    },
    sortList() {
      const priorities =
        {
          'critical' : 0,
          'moderate' : 1,
          'optional' : 2
        }
      this.list.sort( (task1, task2) => {
        return priorities[task1.priority] - priorities[task2.priority];
      });
    },
    deleteItem(index, $event) {
      this.list.splice(index, 1);
      localStorage.setItem('toDoList', JSON.stringify(this.list));
      $event.stopPropagation();
    },
    clearAll() {
      this.list = [];
      localStorage.clear();
    },
    editItem(index) {
      this.isEditMode = true;
      this.userInput = this.list[index].value;
      this.selectedPriority = this.list[index].priority;
      this.selectedItem = index;
    }
  }
};
</script>
<style src="../assets/style.css">
</style>
