import { TodoFormComponent } from './../todo-form/todo-form.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  AddTodo() {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this),
    );
  }

  handleModalTodoFormClose()
  {
    console.log("Hola Mundo.");
  }

}
