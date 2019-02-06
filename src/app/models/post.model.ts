export class Post {
constructor(private title: string,
            private content: string,
            public loveIts: number = 0,
            public created_at: string = new Date().toLocaleDateString()) {}

}

