import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ApiService {

    constructor(private authHttp: AuthHttp, private http: Http) {}

    get(url: string) {
        return this
            .authHttp
            .get(url)
            .map((response: Response) => response.json());
    }
}
