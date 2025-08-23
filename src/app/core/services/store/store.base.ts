import { signal, WritableSignal } from '@angular/core';

export abstract class BaseStore<T extends { id: string | number }> {
  public items: WritableSignal<T[]> = signal([]);
  public current: WritableSignal<T | null> = signal(null);

  setItems(items: T[]): void {
    this.items.set(items);
  }

  setCurrent(item: T | null): void {
    this.current.set(item);
  }

  addItem(newItem: T): void {
    this.items.update((currentItems) => [...currentItems, newItem]);
  }

  removeItem(id: string | number): void {
    this.items.update((currentItems) =>
      currentItems.filter((x) => x.id !== id)
    );
  }
}
