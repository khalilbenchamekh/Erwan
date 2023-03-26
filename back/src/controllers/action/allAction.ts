import { RequestHandler } from 'express';
import { GFlow, AFlow } from '../../models/Flow';
import { Statistiques, MainStatistiquesResponse } from '../../response/MainResponse';

const getAllTasks: RequestHandler = async (req, res) => {
  const aggregate:Array<any> = [
    {
      $group: {
        _id: {
          month: {
            $month: '$timestamp'
          },
          year: {
            $year: '$timestamp'
          }
        },
        TotalValueOfBothFields: {
          $avg: {
            $avg: [
              '$highestPriceOfTheDay',
              '$lowestPriceOfTheDay'
            ]
          }
        }
      }
    },
    {
      $project: {
        TotalValueOfBothFields: '$TotalValueOfBothFields',
        Month: {
          $arrayElemAt: [
            [
              '',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            '$_id.year'
          ]
        }
      }
    },
    {
      $match: { '_id.year': 2022 }
    }
  ];
  const googleRes: Statistiques | any [] = await GFlow.aggregate(aggregate);
  const amazonRes: Statistiques | any [] = await AFlow.aggregate(aggregate);
  const tasks: MainStatistiquesResponse<Statistiques | any []> = {
    google: googleRes,
    amazon: amazonRes
  };
  res.status(200).json({ tasks });
};

export const allAction = getAllTasks;
