// 扩展 number 类型的 compareTo
declare global {
    interface Number {
        compareTo(other: number): number;
    }
}
Number.prototype.compareTo = function (other: number): number {
    return this - other;
};

// 扩展 string 类型的 compareTo
declare global {
    interface String {
        compareTo(other: string): number;
    }
}
String.prototype.compareTo = function (other: string): number {
    return this.localeCompare(other);
};