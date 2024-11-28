import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    if (this.query.searchTerm) {
      this.modelQuery = this.modelQuery
        .find({
          $or: searchAbleFields.map(
            (field) =>
              ({
                [field]: { $regex: this.query.searchTerm, $options: "i" },
              }) as FilterQuery<T>
          ),
        })
        .populate("admissionSemester")
        .populate({
          path: "academicDepartment",
          populate: {
            path: "academicFaculty",
          },
        });
    }

    return this;
  }

  filter() {
    const queryObject = { ...this.query }; //copy
    //filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((element) => delete queryObject[element]);
    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }
}

export default QueryBuilder;
