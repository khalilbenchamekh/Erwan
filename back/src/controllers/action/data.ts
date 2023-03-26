import { RequestHandler } from 'express';
import client from '../../redis';
import { Deed } from '../../models/Deed';

export const getSpeciesData: RequestHandler = async (req, res) => {
  const { name } = req.params;
  let results;
  try {
    results = await Deed.find({
      $expr: { $eq: [{ $month: '$createdAt' }, new Date().getFullYear()] }
    });
    if (results.length === 0) {
      // eslint-disable-next-line no-throw-literal
      throw 'API returned an empty array';
    }

    if (name) {
      await client.set(`data-${name}`, JSON.stringify(results));
    }

    res.send({
      fromCache: false,
      data: results
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(404).send('Data unavailable');
  }
};
