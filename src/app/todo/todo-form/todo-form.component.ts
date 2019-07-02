import { TodoService } from './../service/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../models/todo';
import { TodoViewModel } from '../models/todo-view-model';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  createMode: false;
  todo: TodoViewModel;

  constructor(private fb: FormBuilder,
    // control de cerrar el modal:
    public activeModal: NgbActiveModal,
    // todoService accede a los metodos del servicio
    private todoService: TodoService) { }

  ngOnInit() {

    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      done: false
    });
  }

  saveTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    if (this.createMode) {
      let todo: Todo = this.todoForm.value;
      todo.lastModifiedDate = new Date();
      todo.createdDate = new Date();
      this.todoService.saveTodo(todo)
        .then(response => this.handleSuccessfulSaveTodo(response, todo))
        .catch(err => console.error(err));
    } else {
      let todo: TodoViewModel = this.todoForm.value;
      todo.id = this.todo.id;
      todo.lastModifiedDate = new Date();
      this.todoService.editTodo(todo)
        .then(() => this.handleSuccessfulEditTodo(todo))
        .catch(err => console.error(err));
    }
  }

  handleSuccessfulSaveTodo(response: DocumentReference, todo: Todo) {
    this.activeModal.dismiss({ todo: todo, id: response.id, createMode: true });
  }

  handleSuccessfulEditTodo(todo: TodoViewModel) {
    this.activeModal.dismiss({ todo: todo, id: todo.id, createMode: false });
  }

}
