export abstract class BaseEntity {
    abstract get partitionKey(): string
    abstract get sortKey(): string

    public keys(): object {
        return {
            test_partition_key: this.partitionKey,
            test_sort_key: this.sortKey,
        }
    }

    abstract toItem(): Record<string, unknown>;
}
