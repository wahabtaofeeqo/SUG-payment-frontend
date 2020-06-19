export class Payment {

	private id: number;
	private name: string;
	private matric: string;
	private department: string;
	private phone: string;

	public getName() : string {
		return this.name;
	}

	public getId() : number {
		return this.id;
	}

	public getMatric() : string {
		return this.matric;
	}

	public getDepartment() : string {
		return this.department;
	}

	public getPhone() : string {
		return this.phone;
	}

	public setName(name): void {
		this.name = name;
	}

	public setId(id) {
		this.id = id;
	}

	public setMatric(matric) {
		this.matric = matric;
	}

	public setDepartment(dept) {
		this.department = dept;
	}

	public setPhone(phone) {
		this.phone = phone;
	}
}
