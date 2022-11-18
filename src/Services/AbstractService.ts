import AbstractODM from '../Models/AbstractODM';

abstract class AbstractService<T> {
  private model: AbstractODM<T>;

  constructor(model: AbstractODM<T>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T > {
    const newObj = await this.model.create(obj);
    return newObj;
  }

  public async getAll(): Promise<T[]> {
    const obj = await this.model.getAll();

    return obj as T[];
  }

  public async getById(id: string): Promise<T | null > {
    const obj = await this.model.getById(id);
    return obj;
  }

  public async update(id: string, obj: T): Promise<T > {
    const newObj = await this.model.update(id, obj);
    return newObj as T;
  }
}

export default AbstractService;