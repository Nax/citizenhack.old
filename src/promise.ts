class Promise {
    resolveFn: Function = null;
    refuseFn: Function = null;
    next: Promise = null;
    solved: boolean = false;

    resolve (...params: any[]) : any {
        if (this.resolveFn !== null) {
            if (!this.solved) {
                this.resolveFn.apply(null, params);
                this.solved = true;
            } else if (this.next !== null) {
                this.next.resolve.apply(this.next, params);
            }
        }
    }

    refuse (...params: any[]): any {
        if (this.refuseFn !== null) {
            if (!this.solved) {
                this.refuseFn.apply(null, params);
                this.solved = true;
            } else if (this.next !== null) {
                this.next.refuse.apply(this.next, params);
            }
        }
    }

    defer (promise: Promise) : void {
        if (this.next !== null) {
            promise.then(this.resolve);
            promise.error(this.refuse);
        }
    }

    then (f: Function) : Promise {
        this.resolveFn = f;
        return this;
    }

    error (f: Function): Promise {
        this.refuseFn = f;
        return this;
    }

    chain () : Promise {
        this.next = new Promise;
        return this.next;
    }
}
