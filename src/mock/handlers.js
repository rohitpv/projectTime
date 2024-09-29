import { rest } from "msw";
export const handlers = [

  rest.get("http://localhost:4000/", (req, res, ctx) => {
    if (req.url.toString() == "http://localhost:4000/") {
      return res(
        ctx.status(200),
        ctx.json({
          "message": "Successfully fetched all records",
          "statusCode": 200,
          "data": {
            "memberSum": {
              "Rohit Panchumarthy": {
                "2023-11-10": "23:59",
                "2023-11-11": "01:00",
                "2023-11-21": "08:00"
              },
              "Sai Kalyan": {
                "2023-10-10": "04:00"
              },
              "Sujatha Mallela": {
                "2023-10-17": "08:00"
              }
            },
            "memberTotalSum": {
              "Rohit Panchumarthy": "32:59",
              "Sai Kalyan": "04:00",
              "Sujatha Mallela": "08:00"
            },
            "dataRecords": [
              {
                "subgroups": {
                  "2023-11-10": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "23:59",
                      "clockDate": "2023-11-10",
                      "recordId": "37g28loi88wfu",
                      "taskNote": "Work in Progress",
                      "timeFrom": "00:00",
                      "totalTime": "23:59"
                    }
                  ],
                  "2023-11-11": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "09:00",
                      "clockDate": "2023-11-11",
                      "recordId": "37c54lnsr3lcy",
                      "taskNote": "Cancelled",
                      "timeFrom": "08:00",
                      "totalTime": "01:00"
                    }
                  ],
                  "2023-11-21": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "23:59",
                      "clockDate": "2023-11-21",
                      "recordId": "378p0lp8l8f25",
                      "taskNote": "Work in progress",
                      "timeFrom": "00:00",
                      "totalTime": "08:00"
                    }
                  ]
                },
                "personName": "Rohit Panchumarthy"
              },
              {
                "subgroups": {
                  "2023-10-10": [
                    {
                      "projectName": "QSS",
                      "personName": "Sai Kalyan",
                      "taskName": "SUPPORT",
                      "timeTo": "15:00",
                      "clockDate": "2023-10-10",
                      "recordId": "372l4lnvx5zl3",
                      "taskNote": "Pending",
                      "timeFrom": "11:00",
                      "totalTime": "04:00"
                    }
                  ]
                },
                "personName": "Sai Kalyan"
              },
              {
                "subgroups": {
                  "2023-10-17": [
                    {
                      "projectName": "ACC",
                      "personName": "Sujatha Mallela",
                      "taskName": "CONS",
                      "timeTo": "23:59",
                      "clockDate": "2023-10-17",
                      "recordId": "3c6wbpglno5nzi6",
                      "taskNote": "Task Pending",
                      "timeFrom": "00:00",
                      "totalTime": "08:00"
                    }
                  ]
                },
                "personName": "Sujatha Mallela"
              }
            ]
          }
        })

      );
    }

  }),
  rest.get("http://localhost:4000/project-record", (req, res, ctx) => {
    if (req.url.toString() == 'http://localhost:4000/project-record?project=All%20Projects&memberName=All%20Members&dateFrom=2000-01-01&dateTo=2099-12-31') {
      return res(
        ctx.status(200),
        ctx.json({
          "message": "Successfully fetched all records",
          "statusCode": 200,
          "data": {
            "memberSum": {
              "Rohit Panchumarthy": {
                "2023-11-10": "23:59",
                "2023-11-11": "01:00",
                "2023-11-21": "08:00"
              },
              "Sai Kalyan": {
                "2023-10-10": "04:00"
              },
              "Sujatha Mallela": {
                "2023-10-17": "08:00"
              }
            },
            "memberTotalSum": {
              "Rohit Panchumarthy": "32:59",
              "Sai Kalyan": "04:00",
              "Sujatha Mallela": "08:00"
            },
            "dataRecords": [
              {
                "subgroups": {
                  "2023-11-10": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "23:59",
                      "clockDate": "2023-11-10",
                      "recordId": "37g28loi88wfu",
                      "taskNote": "Work in Progress",
                      "timeFrom": "00:00",
                      "totalTime": "23:59"
                    }
                  ],
                  "2023-11-11": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "09:00",
                      "clockDate": "2023-11-11",
                      "recordId": "37c54lnsr3lcy",
                      "taskNote": "Cancelled",
                      "timeFrom": "08:00",
                      "totalTime": "01:00"
                    }
                  ],
                  "2023-11-21": [
                    {
                      "projectName": "ACC",
                      "personName": "Rohit Panchumarthy",
                      "taskName": "SUPPORT",
                      "timeTo": "23:59",
                      "clockDate": "2023-11-21",
                      "recordId": "378p0lp8l8f25",
                      "taskNote": "Work in progress",
                      "timeFrom": "00:00",
                      "totalTime": "08:00"
                    }
                  ]
                },
                "personName": "Rohit Panchumarthy"
              },
              {
                "subgroups": {
                  "2023-10-10": [
                    {
                      "projectName": "ACC",
                      "personName": "Sai Kalyan",
                      "taskName": "SUPPORT",
                      "timeTo": "15:00",
                      "clockDate": "2023-10-10",
                      "recordId": "372l4lnvx5zl3",
                      "taskNote": "Pending",
                      "timeFrom": "11:00",
                      "totalTime": "04:00"
                    }
                  ]
                },
                "personName": "Sai Kalyan"
              },
              {
                "subgroups": {
                  "2023-10-17": [
                    {
                      "projectName": "ACC",
                      "personName": "Sujatha Mallela",
                      "taskName": "CONS",
                      "timeTo": "23:59",
                      "clockDate": "2023-10-17",
                      "recordId": "3c6wbpglno5nzi6",
                      "taskNote": "Task Pending",
                      "timeFrom": "00:00",
                      "totalTime": "08:00"
                    }
                  ]
                },
                "personName": "Sujatha Mallela"
              }
            ]
          }
        })

      );
    }

    else if (req.url.toString() == 'http://localhost:4000/project-record?project=All%20Projects&memberName=Rohit%20Panchumarthy&dateFrom=2000-01-01&dateTo=2099-12-31')
      return res(
        ctx.status(200),
        ctx.json(

          {
            "message": "Successfully fetched all records",
            "statusCode": 200,
            "data": {
              "memberSum": {
                "Rohit Panchumarthy": {
                  "2023-11-10": "23:59",
                  "2023-11-11": "01:00",
                  "2023-11-21": "08:00"
                }
              },
              "memberTotalSum": {
                "Rohit Panchumarthy": "32:59"
              },
              "dataRecords": [
                {
                  "subgroups": {
                    "2023-11-10": [
                      {
                        "projectName": "ACC",
                        "personName": "Rohit Panchumarthy",
                        "taskName": "SUPPORT",
                        "timeTo": "23:59",
                        "clockDate": "2023-11-10",
                        "recordId": "37g28loi88wfu",
                        "taskNote": "Work in Progress",
                        "timeFrom": "00:00",
                        "totalTime": "23:59"
                      }
                    ],
                    "2023-11-11": [
                      {
                        "projectName": "ACC",
                        "personName": "Rohit Panchumarthy",
                        "taskName": "SUPPORT",
                        "timeTo": "09:00",
                        "clockDate": "2023-11-11",
                        "recordId": "37c54lnsr3lcy",
                        "taskNote": "Cancelled",
                        "timeFrom": "08:00",
                        "totalTime": "01:00"
                      }
                    ],
                    "2023-11-21": [
                      {
                        "projectName": "ACC",
                        "personName": "Rohit Panchumarthy",
                        "taskName": "SUPPORT",
                        "timeTo": "23:59",
                        "clockDate": "2023-11-21",
                        "recordId": "378p0lp8l8f25",
                        "taskNote": "Work in progress",
                        "timeFrom": "00:00",
                        "totalTime": "08:00"
                      }
                    ]
                  },
                  "personName": "Rohit Panchumarthy"
                }
              ]
            }
          })

      );
    else
      return res(
        ctx.status(200),
        ctx.json(
          {
            "message": "No Records found",
            "statusCode": 400,
            "data": []
          }
        )

      );
  }),
  rest.get("http://localhost:4000/project-record/:id", (req, res, ctx) => {
    if (req.params.id == "37g28loi88wfu")
      return res(ctx.status(200),
        ctx.json({
          "message": "Successfully fetched record with given id",
          "statusCode": 200,
          "data": {
            "projectName": "ACC",
            "personName": "Rohit Panchumarthy",
            "taskName": "SUPPORT",
            "timeTo": "23:59",
            "clockDate": "2023-11-10",
            "recordId": "37g28loi88wfu",
            "taskNote": "Work in Progress",
            "timeFrom": "00:00",
            "totalTime": "23:59"
          }
        }))
    else if (req.params.id == "3c6wbpglno5nzi6")
      return res(ctx.status(200),
        ctx.json({
          "message": "Successfully fetched record with given id",
          "statusCode": 200,
          "data": {
            "projectName": "ACC",
            "personName": "Sujatha Mallela",
            "taskName": "CONS",
            "timeTo": "23:59",
            "clockDate": "2023-10-17",
            "recordId": "3c6wbpglno5nzi6",
            "taskNote": "Task Pending",
            "timeFrom": "00:00",
            "totalTime": "08:00"
          }
        }))
    else if (req.params.id == "qwerty12345")
      return res(ctx.status(200),
        ctx.json({
          "message": "Successfully fetched record with given id",
          "statusCode": 200,
          "data": {
            "projectName": "ACC",
            "personName": "Padma Manda",
            "taskName": "SUPPORT",
            "timeTo": "23:59",
            "clockDate": "2000-01-01",
            "recordId": "qwerty12345",
            "taskNote": "Work In Progress",
            "timeFrom": "00:00",
            "totalTime": "08:00"
          }
        }))
    else if (req.params.id == "372l4lnvx5zl3")
      return res(ctx.status(200),
        ctx.json({
          "message": "Successfully fetched record with given id",
          "statusCode": 200,
          "data": {
            "projectName": "QSS",
            "personName": "Sai Kalyan",
            "taskName": "SUPPORT",
            "timeTo": "15:00",
            "clockDate": "2023-10-10",
            "recordId": "372l4lnvx5zl3",
            "taskNote": "Pending",
            "timeFrom": "11:00",
            "totalTime": "04:00"
          }
        }))
  }),
  rest.post("http://localhost:4000/project-record", async (req, res, ctx) => {
    const { projectName, personName, taskName, timeTo, clockDate, taskNote, timeFrom, totalTime } = await req.json();

    return res(ctx.status(200),
      ctx.json({
        "message": "Record added successfully",
        "statusCode": 200,
        "data": {
          "recordId": 'qwerty12345',
          "clockDate": '2000-01-01',
          "taskNote": 'Work In Progress',
          "personName": 'Padma Manda',
          "projectName": 'ACC',
          "taskName": 'SUPPORT',
          "totalTime": '08:00',
          "timeFrom": "00:00",
          "timeTo": "23:59",
        }
      }))
  }),
  rest.put("http://localhost:4000/project-record/:id", async (req, res, ctx) => {
    const { projectName, personName, taskName, timeTo, clockDate, recordId, taskNote, timeFrom, totalTime } = await req.json();
    if (req.params.id == "37g28loi88wfu" && projectName == "ACC" &&
      personName == "Rohit Panchumarthy" &&
      taskName == "SUPPORT" &&
      timeTo == "23:59" &&
      clockDate == "2023-11-10" &&
      recordId == "37g28loi88wfu" &&
      taskNote == "Work in Progress" &&
      timeFrom == "00:00" &&
      totalTime == "23:59") {
      return res(ctx.status(400),
        ctx.json({
          "message": "No changes to make ",
          "statusCode": 400
        }))
    }
    else if (req.params.id != "37g28loi88wfu" &&
      projectName == "ACC" &&
      personName == "Rohit Panchumarthy" &&
      taskName == "SUPPORT" &&
      clockDate == "2023-11-10") {
      return res(ctx.status(400),
        ctx.json({
          "message": "Duplicate entry not allowed ",
          "statusCode": 400
        }))
    }
    else if (req.params.id == "372l4lnvx5zl3" &&
      personName == "Sujatha Mallela" &&
      clockDate == "2023-10-17") {
      return res(ctx.status(400),
        ctx.json({
          "message": "Time overlap not allowed ",
          "statusCode": 400
        }))
    }
    else {
      return res(ctx.status(200),
        ctx.json({
          "message": "Record updated successfully",
          "statusCode": 200,
          "data": {
            "recordId": "37g28loi88wfu",
            "clockDate": "2000-01-01",
            "taskNote": "Work in Progress",
            "personName": "Padma Manda",
            "projectName": "ACC",
            "taskName": "SUPPORT",
            "timeFrom": "00:00",
            "timeTo": "23:59",
            "totalTime": "23:59"
          }
        }))

    }

  }),
  rest.delete("http://localhost:4000/project-record/:id", async (req, res, ctx) => {
    if (req.params.id == "37g28loi88wfu")
      return res(ctx.status(400),
        ctx.json({
          "message": "Record deleted successfully.",
          "statusCode": 200
        }))
    else
      return res(ctx.status(400),
        ctx.json({
          "message": "No record found with given id. ",
          "statusCode": 400
        }))

  })


];

