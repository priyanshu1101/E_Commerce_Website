class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find(keyword);
        return this;
    }
    filter() {
        let queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach((key) => { delete queryCopy[key] });
        queryCopy = JSON.parse(JSON.stringify(queryCopy).replace(/\blt\b/g, "$lt").replace(/\bgt\b/g, "$gt").replace(/\bgte\b/g, "$gte").replace(/\blte\b/g, "$lte"));

        this.query = this.query.find(queryCopy);
        return this;
    }
    pagination(resultPerPage) {
        const currPage = Number(this.queryStr.page) || 1;
        const skip = (currPage - 1) * resultPerPage;
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;