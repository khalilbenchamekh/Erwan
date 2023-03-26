import { RequestHandler } from 'express';
import { GFlow, AFlow } from '../../models/Flow';
import { Decision, MainStatistiquesResponse } from '../../response/MainResponse';

const getDecision: RequestHandler = async (req, res) => {
  const aggregate:Array<any> = [
    {
      $facet: {
        min: [
          {
            $sort: {
              lowestPriceOfTheDay: 1
            }
          },
          {
            $limit: 1
          }
        ],
        max: [
          {
            $sort: {
              highestPriceOfTheDay: -1
            }
          },
          {
            $limit: 1
          }
        ]
      }
    },
    {
      $project: {
        buy: {
          $first: '$min'
        },
        sell: {
          $first: '$max'
        }
      }
    }
  ];
  const googleRes: Decision | any [] = await GFlow.aggregate(aggregate);
  const amazonRes: Decision | any [] = await AFlow.aggregate(aggregate);
  const tasks: MainStatistiquesResponse<Decision | any []> = {
    google: googleRes,
    amazon: amazonRes
  };
  res.status(200).json({ tasks });
};

export const decision = getDecision;
