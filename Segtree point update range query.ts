class SegmentTree {
  // Use an array to store the values in the segment tree
  private values: number[];

  // Initialize the segment tree with a given array of values
  constructor(array: number[]) {
    const n = array.length;
    this.values = new Array(n * 4);
    this.buildTree(array, 0, n - 1, 1);
  }

  // Build the segment tree recursively
  private buildTree(array: number[], left: number, right: number, index: number): void {
    // If the current range only has one element, store it in the current node
    if (left === right) {
      this.values[index] = array[left];
      return;
    }
    // Otherwise, calculate the middle of the range and build the left and right children
    const middle = Math.floor((left + right) / 2);
    this.buildTree(array, left, middle, index * 2);
    this.buildTree(array, middle + 1, right, index * 2 + 1);
    // Update the value in the current node with the maximum of the left and right children
    this.values[index] = Math.max(this.values[index * 2], this.values[index * 2 + 1]);
  }

  // Find the maximum value in a given range
  query(left: number, right: number): number {
    return this.queryHelper(left, right, 0, this.values.length / 4 - 1, 1);
  }

  // Find the maximum value in a given range (helper function)
  private queryHelper(queryLeft: number, queryRight: number, left: number, right: number, index: number): number {
    // If the current range is contained within the query range, return the value in the current node
    if (queryLeft <= left && queryRight >= right) {
      return this.values[index];
    }
    // Otherwise, calculate the middle of the range and query the left and right children
    const middle = Math.floor((left + right) / 2);
    let result = Number.MIN_SAFE_INTEGER;
    if (queryLeft <= middle) {
      result = Math.max(result, this.queryHelper(queryLeft, queryRight, left, middle, index * 2));
    }
    if (queryRight > middle) {
      result = Math.max(result, this.queryHelper(queryLeft, queryRight, middle + 1, right, index * 2 + 1));
    }
    return result;
  }
}
