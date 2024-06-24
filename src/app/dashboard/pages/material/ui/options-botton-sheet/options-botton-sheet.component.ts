import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-options-botton-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './options-botton-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsBottonSheetComponent {
  openLink(event: MouseEvent): void {
    console.log(event);
  }
}
