class Bag {
  items = [];

  constructor(newItems = []) {
    this.items = newItems;
  }

  includes(item) {
    return this.items.includes(item);
  }

  remove(item) {
    const targetItemIndex = this.items.indexOf(item);
    this.items.splice(targetItemIndex, 1);
  }
}

export default Bag;
