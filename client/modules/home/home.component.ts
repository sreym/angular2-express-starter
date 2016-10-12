import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";
import { Http, Response } from "@angular/http";

@Component({
    selector: "home",
    templateUrl: `client/modules/home/home.component.html`,
    styleUrls: ['client/modules/home/home.component.css'],
})
export class HomeComponent {
    error: string;
    response: {};
    sourceCode: string = '';

    constructor(private apiService: ApiService, private http: Http) {}

    protected() {
        this.apiService
            .get("/api")
            .subscribe(
                (data) => { this.response = data; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }

    onChange(data) {
        this.sourceCode = data;
    }

    verifyCode() {
        this.http
            .post('/api/verify', {
                code: this.sourceCode
            })
            .subscribe(
                data => {
                    console.log(data.json());
                },
                error => {
                    console.log(error);
                }
            );
    }
}
