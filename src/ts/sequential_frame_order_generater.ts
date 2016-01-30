class SequentialFrameOrderGenerater {
    generate(start: number, count: number): number[] {
        var result: number[] = [];
        for (var i = start; i <= start + count; i++) {
            result.push(i)
        }
        return result
    }
}