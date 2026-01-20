import { readFileSync } from "fs";

export class CidDTO{
  code!: string;
  value!: string;
  valueUpper!: string;

  constructor(
    code: string,
    value: string,
    valueUpper: string
  ){
    this.code = code;
    this.value = value;
    this.valueUpper = value;
  }
}

export class CidService {
  #buf: Buffer;
  #cids: Map<string, CidDTO>;

  constructor(filepath: string){
    this.#buf = readFileSync(filepath);
    const json = JSON.parse(this.#buf.toString()) as CidDTO[];

    this.#cids = new Map();
    json.forEach(data => this.#cids.set(data.code, new CidDTO(
      data.code,
      data.value,
      data.value.toUpperCase()
    )));
  }

  query(ref: string){  
    console.log(ref);  
    if(this.#cids.has(ref))
      return this.#cids.get(ref);

    const list = [];
    
    for(const i of this.#cids.values().toArray()){
      if(i.valueUpper.includes(ref.toUpperCase()))
        list.push(i);
    }

    return list;
  }

  test(){
    console.log(this.#cids.values())
  }
}