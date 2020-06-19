export class Student {
	id: number;
	name: string;
	dept: string;
	level: string;
	matric: string;

	public setMatric(v : string) {
		this.matric = v;
	}

	public getMatric() : string {
		return this.matric;
	}

	public setName(v : string) {
		this.name = v;
	}

	public getName() : string {
		return this.name;
	}
}