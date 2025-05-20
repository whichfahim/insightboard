import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dragdropmixedsortingexample',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './dragdropmixedsortingexample.component.html',
  styleUrl: './dragdropmixedsortingexample.component.scss',
})
export class DragdropmixedsortingexampleComponent {
  items = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
