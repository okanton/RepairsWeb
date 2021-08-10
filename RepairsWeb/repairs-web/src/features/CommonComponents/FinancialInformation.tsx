import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../App/appHooks";
import { limitsDataActions } from "../../dataLayer/limits-data-slice";
import { refillingDataActions } from "../../dataLayer/refillings-data-slice";
import { repairsDataActions } from "../../dataLayer/repairs-data-slice";
import { TaskTypesEnum } from "../../entities/enums";
import {
  refillingsSettingsSelector,
  repairsSettingsSelector,
} from "../../selectors/filter-settings-selectors";
import { currentLimitsSelector } from "../../selectors/limits-selectors";
import {
  completeRefillingsMoneySelector,
  refillingsEconomySelector,
} from "../../selectors/refillings-selectors";
import {
  completeRepairsMoneySelector,
  repairsEconomySelector,
} from "../../selectors/repairs-selector";

interface FinancialInformationProps {
  taskType: TaskTypesEnum;
}

const FinancialInformation = ({ taskType }: FinancialInformationProps) => {
  const dispatch = useAppDispatch();
  const completeMoney =
    taskType === TaskTypesEnum.taskRefillings
      ? useSelector(completeRefillingsMoneySelector)
      : useSelector(completeRepairsMoneySelector);

  const economy =
    taskType === TaskTypesEnum.taskRefillings
      ? useSelector(refillingsEconomySelector)
      : useSelector(repairsEconomySelector);

  const allLimits = useSelector(currentLimitsSelector);
  const currentLimit = allLimits.find((p) => p.serviceTypeId === taskType);
  const { dateFrom, dateTo } =
    taskType === TaskTypesEnum.taskRefillings
      ? useSelector(refillingsSettingsSelector)
      : useSelector(repairsSettingsSelector);

  useEffect(() => {
    if (taskType === TaskTypesEnum.taskRefillings) {
      dispatch(
        refillingDataActions.getCompleteRefillingsMoneyByPeriod({
          dateFrom,
          dateTo,
        })
      );
    } else {
      dispatch(
        repairsDataActions.getCompleteRepairsMoneyByPeriod({
          dateFrom,
          dateTo,
        })
      );
    }
  }, [dispatch, dateFrom, dateTo]);

  useEffect(() => {
    if (taskType === TaskTypesEnum.taskRefillings) {
      dispatch(refillingDataActions.getEconomyRefillingsMoneyLoading());
    } else {
      dispatch(repairsDataActions.getEconomyRepairsMoneyLoading());
    }
    dispatch(limitsDataActions.getCurrentLimitsLoading());
  }, [dispatch]);

  return (
    <Grid container alignItems="center" spacing={4}>
      {currentLimit != null ? (
        <Grid item>
          <Typography variant="body2" gutterBottom>
            Лимит текущего периода:{" "}
            <b>
              {new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(currentLimit.limit)}
            </b>
          </Typography>
        </Grid>
      ) : null}
      <Grid item>
        <Typography variant="body2" gutterBottom>
          Стоимость выполненных работ:{" "}
          <b>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(completeMoney)}
          </b>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" gutterBottom>
          Экономия бюджета с начала текущего года:{" "}
          <b>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(economy)}
          </b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(FinancialInformation);
