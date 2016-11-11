export interface LifeCycle {
    onEnable(): void;
    onUpdate(): void;
    onDisable(): void;
}