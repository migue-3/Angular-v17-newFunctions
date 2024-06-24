import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  input,
  output,
} from '@angular/core';
import { Product } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  //Si queremos recibir el producto, la manera tradicional de hacerlo seria:
  // @Input({
  //   required: true
  // }) public product!: Product

  // Para hacer lo mismo con las nuevas funciones de Input y Output seria asi, input es para recibir desde el comp padre:
  public product = input.required<Product>();

  //Manera tradicional de hacer el Output, necesitamos notificarle al componente padre
  // que en este caso seria input-output.component, que se hizo click en el boton para aumentar la cantidad del producto
  // @Output()
  // public onIncrementQuantity = new EventEmitter<number>();

  //Nueva manera de hacerlo
  public onIncrementQuantity = output<number>();

  public incrementQuantity(): void {
    this.onIncrementQuantity.emit(this.product().quantity + 1);
  }

  //Como product es una signal podemos aplicarle efectos como por ej cuando el producto cambia
  public loginEffect = effect(() => {
    console.log(this.product().name);
  });
}
