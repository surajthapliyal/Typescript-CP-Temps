class UnionFind {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(size: number) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);
    this.count = size;
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  find(index: number): number {
    if (this.parent[index] === index) return index;
    this.parent[index] = this.find(this.parent[index]);
    return this.parent[index];
  }

  union(index1: number, index2: number): void {
    const root1 = this.find(index1);
    const root2 = this.find(index2);
    if (root1 === root2) return;
    if (this.rank[root1] > this.rank[root2]) {
      this.parent[root2] = root1;
    } else if (this.rank[root1] < this.rank[root2]) {
      this.parent[root1] = root2;
    } else {
      this.parent[root1] = root2;
      this.rank[root2]++;
    }
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}
